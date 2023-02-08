import React, { useEffect, useRef, useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';
import {
  useRecoilSnapshot,
  useRecoilState,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { withMainData, withSectionOrder } from '@recoil/editor';
import {
  dragElementToElement,
  dragElementToSection,
  dragOuterElementToElement,
  dragOuterElementToSection,
  dragOuterSection,
  dragSection,
  dragStart,
} from '@utils/drag';
import ElementControlWidget from '../ControlWidget/element';
import SectionControlWidget from '../ControlWidget/section';
import { useRouter } from 'next/router';
import * as StompJS from '@stomp/stompjs';
import { useSession } from '@lib/next-auth-react-query';
import projectAtom from '@recoil/project/atom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { api } from '@api';
import editorAtom from '@recoil/editor/atom';
import { CreateSection } from '@utils/createElement';
import { createElementProps } from '@/types/editor';
import { useContentEditable } from '@hooks/useContentEditable';
import { clickEffectStyle, dragEffectStyle } from '@utils/effect';
import { log } from 'console';
import { EditorHeader } from './styled';
import Avatar from 'react-avatar';

interface UserProps {
  authority: string;
  authorityChangedToViewer: boolean;
  pageId: string;
  sessionId: string;
  userId: string;
}
var colors = ['red', 'green', 'blue', 'orange', 'yellow'];

const UserComponent = ({ user, idx }: { user: UserProps; idx: number }) => {
  return (
    <Avatar
      name={user.userId}
      size="30"
      color={colors[idx]}
      textSizeRatio={2}
      round="50%"
    />
  );
};

const EditorFrame = () => {
  //============
  const [editorMain, setEditorMain] = useState({});
  const [editorSectionOrder, setEditorSectionOrder] = useState([]);
  const router = useRouter();
  const { projectId, pageId } = router.query;
  const [ed, setEd] = useRecoilState(editorAtom);
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const [insertLocation, setInsertLocation] = useState<string>();
  const [draggingOver, setDraggingOver] = useState<any>();
  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);

  const editorRef = useRef(null);
  //===============
  //필수
  const projectInfo = useRecoilValue(projectAtom);

  const stompClient = useRef(null);
  const [editorExists, setEditorExists] = useState(false);
  const [viewerExists, setViewerExists] = useState(false);
  //FIXME: editorExists를 에디터 접속 전에 판단하는 로직 유무
  const [newUserName, setNewUserName] = useState('');
  const [userAuthority, setUserAuthority] = useState<string>('');
  const [authority, setAuthority] = useState(projectInfo.authority);
  const [isSynced, setIsSynced] = useState(null);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  //필수는 아님
  const [joinedUserCount, setJoinedUserCount] = useState(0);
  const [isNewUserJoin, setIsNewUserJoin] = useState(false);

  const CONNECTION_URL = 'ws://10.5.26.40:8080/ws';
  const SEND_URL = '/publish/documents';
  const EDITOR_SUBSCRIBE_URL = '/subscribe/page/';

  function isUserJoinEvent(message) {
    let evt = JSON.parse(message.body).eventType;

    return evt === 'USER_JOIN_EVENT';
  }

  function isUserDisconnectEvent(message) {
    let evt = JSON.parse(message.body).eventType;

    return evt === 'USER_DISCONNECT_EVENT';
  }

  //에디터에 텍스트를 입력하는 이벤트가 발생했을 때 서버로 메세지를 보냄
  function handleEditorChange(data) {
    console.log('change');
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: projectInfo.pageId,
        messageType: 'EDIT',
        eventType: 'CONTENT_CHANGE',
        content: JSON.stringify(data),
        sender: projectInfo.id,
      }),
    });
  }

  //새로운 유저가 입장했을 때 자신의 정보를 다른 유저들에게 메세지로 전달함
  function userJoin() {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: projectInfo.pageId,
        messageType: 'SUBSCRIBE',
        eventType: 'USER_JOIN_EVENT',
        authority: projectInfo.authority,
        sender: projectInfo.id,
        subscribers: users,
      }),
    });
  }

  //본인이 단독 에디터라면 새로운 유저에게 본인의 컨텐츠를 전송함
  function sendCurrentEditorContent(newUser, content) {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: projectInfo.pageId,
        messageType: 'EDIT',
        eventType: 'SET_INITIAL_CONTENT',
        content: JSON.stringify(content),
        sender: projectInfo.id,
        receiver: newUser, //타겟이 되는 새로운 유저에게 메세지를 받을 수 있도록 세팅
      }),
    });
  }

  //위임 기능에서 사용
  function findEditorCandidateList() {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: projectInfo.pageId,
        messageType: 'AUTHORITY',
        eventType: 'FIND_EDITOR_CANDIDATE_LIST',
        sender: projectInfo.id,
      }),
    });
  }

  function isNewUserNeedsToSetInitialContent(message) {
    //본인이 방금 들어와 에디터의 내용이 비어있는 새로운 유저인지 확인
    let evt = JSON.parse(message.body).eventType;
    let targetUserId = JSON.parse(message.body).receiver;
    return targetUserId === projectInfo.id && evt === 'SET_INITIAL_CONTENT';
  }

  //에디터 진입 시 최초로 웹소켓 서버와 연결이 일어남.
  //CONNECT-SUBSCRIBE 순서로 연결됨.
  const editorConnect = () => {
    stompClient.current = new StompJS.Client({
      maxWebSocketChunkSize: 10000000,
      splitLargeFrames: true,

      brokerURL: CONNECTION_URL,
      debug: function (str) {
        console.log(str);
      },
      connectHeaders: {
        Authorization: 'Bearer ',
        UserName: projectInfo.id,
      },
      onConnect: () => {
        //connect를 실행할 때 발생함
        setIsConnected(true);
        if (projectInfo.pageId !== undefined && userAuthority !== undefined)
          stompClient.current.subscribe(
            //특정 채널 구독 시작
            EDITOR_SUBSCRIBE_URL + projectInfo.pageId,
            (message) => {
              const parsedBody = JSON.parse(message.body);
              if (isUserJoinEvent(message)) {
                //새로운 유저가 입장하는 이벤트 발생
                console.log('aaa', JSON.parse(message.body));
                setUsers(JSON.parse(message.body).currentChannelSubscribers);

                if (projectInfo.id === parsedBody.currentEditorId) {
                  //서버에 거쳐서 확인한 본인의 권한이 에디터라면 세팅

                  if (parsedBody.sender !== projectInfo.id) {
                    //방금 들어온 유저가 본인이 아니라면 현재 에디터에 편집하고 있는 내용을 새로운 유저에게 전송
                    setIsNewUserJoin(true);
                    setNewUserName(parsedBody.sender);
                  } else {
                    //본인이 에디터에 방금 입장해서 Edit 권한을 최초로 획득한 사람이라면 == DB
                    setEditorExists(true);
                  }
                  return;
                }

                //이미 에디터가 입장해 있는데 에디터 권한으로 들어왔다면 - 뷰어로 변경하는 로직 구현
                if (
                  parsedBody.authorityChanged === true &&
                  parsedBody.sender === projectInfo.id
                ) {
                  Swal.fire({
                    icon: 'warning',
                    title:
                      '이미 Editor가 존재하는 방에 접근하였습니다. 권한을 viewer로 변경합니다.',
                  });
                  setUserAuthority('VIEWER');
                  return;
                }

                //본인이 에디터가 없는 환경의 뷰어라면??
                if (
                  parsedBody.authorityChanged === false &&
                  parsedBody.authority === 'VIEWER' &&
                  parsedBody.sender === projectInfo.id
                ) {
                  setViewerExists(true);
                }
              }

              if (isNewUserNeedsToSetInitialContent(message)) {
                //본인이 방금 입장하여 최초로 에디터에 내용을 세팅해야 하는 유저라면 에디터가 보낸 메세지를 받아서 세팅함.
                setEditorMain(JSON.parse(parsedBody.content).main);
                setEditorSectionOrder(
                  JSON.parse(parsedBody.content).sectionOrder
                );

                return;
              }

              if (isUserDisconnectEvent(message)) {
                setUsers(parsedBody.currentChannelSubscribers);

                return;
              }

              //USER 입장/퇴장 이벤트를 제외하고 텍스트를 편집하는 이벤트의 경우에는 에디터에 콘텐츠 세팅
              if (parsedBody.eventType === 'CONTENT_CHANGE') {
                setEditorMain(JSON.parse(parsedBody.content).main);
                setEditorSectionOrder(
                  JSON.parse(parsedBody.content).sectionOrder
                );
              }
            }
          );
        userJoin();
      },
      onDisconnect: () => {
        //웹소켓 연결 끊어질 때에는 서버에 자동으로 전송되어 처리할 필요는 없음
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    stompClient.current.activate();
  };

  const getSync = async () => {
    await api.getProjectSync(projectInfo.projectId).then((res) => {
      setIsSynced(res);
    });
  };

  useEffect(() => {
    setUserAuthority(projectInfo.authority);
    getSync();
    editorConnect();
  }, [projectInfo]);

  // useEffect(() => {
  //   setJoinedUserCount(users.length);
  // }, [users]); //최초 연결 시 + 현재 최초로 입장한 유저일 때 데이터 로딩받음

  useEffect(() => {
    //편집중인 에디터가 없어 DB 저장 내역을 받아와야 할 때
    if (isSynced || viewerExists) {
      axios
        .get(
          `https://api-dev.onstove.com/innoco/projects/${projectId}/pages/${pageId}?source=SAVED`
        )
        .then((response) => {
          console.log('resopno', response);
          console.log('res', JSON.parse(response.data.value.pageJson).main);
          setEditorMain(JSON.parse(response.data.value.pageJson).main);
          setEditorSectionOrder(
            JSON.parse(response.data.value.pageJson).sectionOrder
          );
        });
      return;
    } else if (editorExists && isSynced !== null) {
      Swal.fire({
        icon: 'warning',
        text: '페이지 편집 내역을 어디서 가져올까요?',
        showCancelButton: true,
        confirmButtonText: '게시된 프로젝트',
        cancelButtonText: '자동저장된 프로젝트',
      }).then((res) => {
        let source;
        if (res.isConfirmed) {
          source = 'PUBLISHED';
        } else {
          source = 'SAVED';
        }

        axios
          .get(
            `https://api-dev.onstove.com/innoco/projects/${projectId}/pages/${pageId}?source=SAVED`
          )
          .then((response) => {
            setEditorMain(JSON.parse(response.data.value.pageJson).main);
            setEditorSectionOrder(
              JSON.parse(response.data.value.pageJson).sectionOrder
            );
          });
      });
    }
  }, [editorExists, viewerExists, isSynced]);

  useEffect(() => {
    //만약 새로운 유저가 들어왔다면, 현재 작성중인 에디터의 컨텐츠를 전송함.
    if (newUserName !== '') {
      sendCurrentEditorContent(newUserName, ed);
    }
    setIsNewUserJoin(false);
    setNewUserName('');
  }, [isNewUserJoin, newUserName]);

  const handleElementClick = (e, sectionId, idx, element) => {
    const clickedElement = {
      id: element.id,
      el: element,
      index: idx,
      sectionId: sectionId,
    };
    setCurrentSelectedElement(clickedElement);
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    console.log('editor main', editorMain);
    console.log('section', sectionOrder);
    console.log('edsect', editorSectionOrder);
    const { el, elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
    console.log('image', el);
    if (el.id === draggingOver.el.id) return;
    if (el.type === 'section') {
      if (elIdx !== '') dragSection({ e, draggingOver, setSectionOrder });
      else dragOuterSection({ e, draggingOver, setMain, setSectionOrder });
    }
    if (el.type !== 'section') {
      if (draggingOver.el.type === 'section') {
        if (elIdx !== '') dragElementToSection({ e, draggingOver, setMain });
        else dragOuterElementToSection({ e, draggingOver, setMain });
      } else {
        if (elIdx !== '')
          dragElementToElement({ e, draggingOver, insertLocation, setMain });
        else
          dragOuterElementToElement({
            e,
            draggingOver,
            insertLocation,
            setMain,
          });
      }
    }
    setDraggingOver(null);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e, element, sectionId, idx) => {
    setDraggingOver({ el: element, sectionId: sectionId, idx: idx });
    setInsertLocation(
      getInsertLocation({
        e,
        element,
        direction: element.type === 'section' ? 'col' : 'row',
      })
    );
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    editorRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });
  }, []);

  const [dblClickElement, setDblClickElement] = useState<string>();
  const handleElementDblClick = (elementId) => {
    setDblClickElement(elementId);
  };

  const handleDragEnd = () => {
    setDraggingOver(null);
  };

  const createChild = ({
    element,
    elementIdx,
    sectionId,
  }: createElementProps) => {
    const props = {
      ...element.props,
      id: element.id,
      key: element.id,
      href: 'none',
      onDragStart: (e) =>
        dragStart({
          e: e,
          element: element,
          idx: elementIdx,
          sectionId: sectionId,
        }),
      contentEditable: dblClickElement === element.id,
      suppressContentEditableWarning: dblClickElement === element.id,
      onDragEnd: () => handleDragEnd(),
      onDoubleClick: () => handleElementDblClick(element.id),
      onClick: (e) => handleElementClick(e, sectionId, elementIdx, element),
      onBlur: (e) => {
        useContentEditable(e, elementIdx, sectionId, setMain);
        setDblClickElement('');
      },
      className: clickEffectStyle({
        clickedId: currentSelectedElement.id,
        elementId: element.id,
      }),
      // className: element.parentProps.className.join(' '),
    };
    delete props.href;
    if (element.tag === 'img') return React.createElement(element.tag, props);
    return React.createElement(element.tag, props, element.content);
  };

  const createParent = ({
    element,
    elementIdx,
    sectionId,
  }: createElementProps) => {
    const props = {
      ...element.parentProps,
      id: `parent_${element.id}`,
      key: `parent_${element.id}`,
      onDragOver: (e) => handleDragOver(e, element, sectionId, elementIdx),
      className: `box-border ${dragEffectStyle({
        insertLocation,
        draggingOverId: draggingOver?.el.id,

        elementId: element.id,
      })}`,
      // className: element.parentProps.className.join(' '),
    };
    return React.createElement(
      'div',
      props,
      createChild({ element, elementIdx, sectionId })
    );
  };

  useEffect(() => {
    console.log('ed', editorMain);
    console.log('main', main);
    if (JSON.stringify(editorMain) !== JSON.stringify(main))
      setMain(editorMain);
  }, [editorMain]);

  useEffect(() => {
    if (JSON.stringify(editorSectionOrder) !== JSON.stringify(sectionOrder))
      setSectionOrder(editorSectionOrder);
  }, [editorSectionOrder]);

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) {
        func();
      } else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    console.log('isconnected', isConnected);
    if (isConnected) handleEditorChange(ed);
  }, [ed]);
  //   export const EditorHeader = styled.div`
  //   position: sticky;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   border: 2px solid white;
  //   width: calc(100vw);
  //   height: 30px;
  //   color: white;
  //   background-color: ${theme.color.gray.dark};
  // `;

  const handlePublish = async () => {
    const data = await api.publishProject(projectInfo.projectId);
    console.log(data);
  };
  return (
    <div
      style={{
        width: '4000px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      ref={editorRef}
    >
      <div className="sticky flex justify-end items-center top-0 left-0 right-0 mb-10 h-10 bg-[#22262E] w-screen">
        <div className="flex gap-x-2">
          {users.map((user, idx) => (
            <div key={user.sessionId}>
              <UserComponent user={user} idx={idx} />
            </div>
          ))}
        </div>
        <button
          className="py-1	px-3 ml-8	text-white bg-[#33ADFF] hover:bg-[#238DE0] rounded-md"
          onClick={() => handlePublish()}
        >
          publish
        </button>
      </div>
      <div id="test" style={{ width: '1000px' }}>
        {sectionOrder.length &&
          sectionOrder.map((sectionId, sectionIdx) => {
            return (
              <div key={sectionId}>
                {sectionId === currentSelectedElement.id && (
                  <SectionControlWidget />
                )}
                <CreateSection
                  sectionId={sectionId}
                  sectionIdx={sectionIdx}
                  draggingOver={draggingOver}
                  insertLocation={insertLocation}
                  handleDragOver={(e) =>
                    handleDragOver(e, main[sectionId], sectionId, sectionIdx)
                  }
                  handleDrop={handleDrop}
                  onClick={(e) =>
                    handleElementClick(
                      e,
                      sectionId,
                      sectionIdx,
                      main[sectionId]
                    )
                  }
                  handleEditorChange={() => handleEditorChange(ed)}
                >
                  {main[sectionId].children.map((element, elementIdx) => (
                    <div key={element.id}>
                      {element.id === currentSelectedElement.id && (
                        <ElementControlWidget />
                      )}
                      {createParent({ element, elementIdx, sectionId })}
                    </div>
                  ))}
                </CreateSection>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default EditorFrame;
