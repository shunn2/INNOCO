import { api } from '@api';
import pageApi from '@api/pageApi';

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { withMainData, withSectionOrder } from '@recoil/editor';
import projectAtom from '@recoil/project/atom';
import editorAtom from '@recoil/editor/atom';

import * as StompJS from '@stomp/stompjs';

import {
  dragElementToElement,
  dragElementToSection,
  dragOuterElementToElement,
  dragOuterElementToSection,
  dragOuterSection,
  dragSection,
  dragStart,
} from '@utils/drag';
import { getInsertLocation } from '@utils/getInsertLocation';
import { CreateSection } from '@utils/createElement';
import { useContentEditable } from '@hooks/useContentEditable';
import { clickEffectStyle, dragEffectStyle } from '@utils/effect';
import { ElementControlWidget, SectionControlWidget } from '../ControlWidget';
import UserAvatar from '@components/Common/UserAvatar';
import Alert from '@components/Common/Alert';

import { createElementProps } from '@/types/editor';
import useDidMountEffect from '@hooks/useDidMountEffect';
// import CreateGuestBook from '@utils/createElement/dataComponent/guestBook';

const CONNECTION_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const SEND_URL = process.env.NEXT_PUBLIC_SOCKET_SEND_URL;
const EDITOR_SUBSCRIBE_URL = process.env.NEXT_PUBLIC_SOCKET_SUBSCRIBE_URL;

const EditorFrame = () => {
  const [editorData, setEditorData] = useRecoilState(editorAtom);
  const [editorMain, setEditorMain] = useState({});
  const [editorSectionOrder, setEditorSectionOrder] = useState([]);
  const [main, setMain] = useRecoilState(withMainData);
  const [sectionOrder, setSectionOrder] = useRecoilState(withSectionOrder);
  const projectInfo = useRecoilValue(projectAtom);
  const [currentSelectedElement, setCurrentSelectedElement] =
    useRecoilState(elementInfoAtom);
  const [draggingOver, setDraggingOver] = useState<any>();
  const [dblClickElement, setDblClickElement] = useState<string>();
  const [insertLocation, setInsertLocation] = useState<string>();

  const editorRef = useRef(null);

  const stompClient = useRef(null);
  const [editorExists, setEditorExists] = useState<boolean>(false);
  const [viewerExists, setViewerExists] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [userAuthority, setUserAuthority] = useState<string>('');
  const [isSynced, setIsSynced] = useState<boolean>(null);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isNewUserJoin, setIsNewUserJoin] = useState<boolean>(false);

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
        setIsConnected(true);
        if (projectInfo.pageId !== undefined && userAuthority !== undefined)
          stompClient.current.subscribe(
            //특정 채널 구독 시작
            EDITOR_SUBSCRIBE_URL + projectInfo.pageId,
            (message) => {
              const parsedBody = JSON.parse(message.body);
              let parsedContent;
              if (parsedBody.content)
                parsedContent = JSON.parse(parsedBody.content);
              if (isUserJoinEvent(message)) {
                //새로운 유저가 입장하는 이벤트 발생
                setUsers(parsedBody.currentChannelSubscribers);
                if (projectInfo.id === parsedBody.currentEditorId) {
                  //서버에 거쳐서 확인한 본인의 권한이 에디터라면 세팅
                  if (parsedBody.sender !== projectInfo.id) {
                    //방금 들어온 유저가 본인이 아니라면 현재 에디터에 편집하고 있는 내용을 새로운 유저에게 전송
                    setIsNewUserJoin(true);
                    setNewUserName(parsedBody.sender);
                  } else setEditorExists(true); //본인이 에디터에 방금 입장해서 Edit 권한을 최초로 획득한 사람이라면 == DB
                  return;
                }
                //이미 에디터가 입장해 있는데 에디터 권한으로 들어왔다면 - 뷰어로 변경하는 로직 구현
                if (
                  parsedBody.authorityChanged &&
                  parsedBody.sender === projectInfo.id
                ) {
                  Alert({
                    icon: 'warning',
                    title:
                      '이미 Editor가 존재하는 방에 접근하였습니다. 권한을 viewer로 변경합니다.',
                  });
                  setUserAuthority('VIEWER');
                  return;
                }
                //본인이 에디터가 없는 환경의 뷰어라면??
                if (
                  !parsedBody.authorityChanged &&
                  parsedBody.authority === 'VIEWER' &&
                  parsedBody.sender === projectInfo.id
                )
                  setViewerExists(true);
              }
              if (isNewUserNeedsToSetInitialContent(message)) {
                //본인이 방금 입장하여 최초로 에디터에 내용을 세팅해야 하는 유저라면 에디터가 보낸 메세지를 받아서 세팅함.
                setEditorMain(parsedContent.main);
                setEditorSectionOrder(parsedContent.sectionOrder);
                return;
              }
              if (isUserDisconnectEvent(message)) {
                setUsers(parsedBody.currentChannelSubscribers);
                return;
              }
              //USER 입장/퇴장 이벤트를 제외하고 텍스트를 편집하는 이벤트의 경우에는 에디터에 콘텐츠 세팅
              if (parsedBody.eventType === 'CONTENT_CHANGE') {
                setEditorMain(parsedContent.main);
                setEditorSectionOrder(parsedContent.sectionOrder);
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
    const data = await api.getProjectSync(projectInfo.projectId);
    setIsSynced(data.value);
  };

  const handlePublish = async () => {
    await api.publishProject(projectInfo.projectId);
  };

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
    const { el, elIdx } = JSON.parse(e.dataTransfer.getData('dragging'));
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

  const CreateGuestBook = ({ data, sectionId, sectionIdx }) => {
    const sectionProps = {
      ...data.sectionProps,
      draggable: true,
    };
    return (
      <div
        {...sectionProps}
        id={sectionId}
        onDragStart={(e) =>
          dragStart({
            e: e,
            element: main[sectionId],
            idx: sectionIdx,
            sectionId,
          })
        }
        onDragOver={(e) =>
          handleDragOver(e, main[sectionId], sectionId, sectionIdx)
        }
        onDrop={handleDrop}
        // onDragEnd={() => handleEditorChange()}
        onClick={(e) =>
          handleElementClick(e, sectionId, sectionIdx, main[sectionId])
        }
        className={`${dragEffectStyle({
          insertLocation,
          draggingOverId: draggingOver?.el.id,
          elementId: sectionId,
        })} ${clickEffectStyle({
          clickedId: currentSelectedElement.id,
          elementId: sectionId,
        })}`}
      >
        <h4 className="my-3">0개의 방명록</h4>
        <div {...data.children[1].parentProps}>
          <textarea id="input" {...data.children[1].props} />
          <div {...data.children[2].parentProps}>
            <button {...data.children[2].props}>작성</button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (JSON.stringify(editorMain) !== JSON.stringify(main))
      setMain(editorMain);
    if (JSON.stringify(editorSectionOrder) !== JSON.stringify(sectionOrder))
      setSectionOrder(editorSectionOrder);
  }, [editorMain, editorSectionOrder]);

  useEffect(() => {
    //편집중인 에디터가 없어 DB 저장 내역을 받아와야 할 때
    if (isSynced || viewerExists) {
      pageApi
        .getPageForEditor(projectInfo.projectId, projectInfo.pageId)
        .then((response) => {
          setEditorMain(response.main);
          setEditorSectionOrder(response.sectionOrder);
        });
    } else if (editorExists && isSynced !== null) {
      Alert({
        icon: 'warning',
        text: '페이지 편집 내역을 어디서 가져올까요?',
        showCancelButton: true,
        confirmButtonText: '게시된 프로젝트',
        cancelButtonText: '자동저장된 프로젝트',
      }).then((res) => {
        if (res.isConfirmed) pageApi.overWritePage(projectInfo.projectId);
        pageApi
          .getPageForEditor(projectInfo.projectId, projectInfo.pageId)
          .then((response) => {
            setEditorMain(response.main);
            setEditorSectionOrder(response.sectionOrder);
          });
      });
    }
  }, [editorExists, viewerExists, isSynced]);

  useEffect(() => {
    //만약 새로운 유저가 들어왔다면, 현재 작성중인 에디터의 컨텐츠를 전송함.
    if (newUserName !== '') sendCurrentEditorContent(newUserName, editorData);
    setIsNewUserJoin(false);
    setNewUserName('');
  }, [isNewUserJoin, newUserName]);

  useEffect(() => {
    setUserAuthority(projectInfo.authority);
    getSync();
    editorConnect();
  }, [projectInfo]);

  useDidMountEffect(() => {
    if (isConnected) handleEditorChange(editorData);
  }, [editorData]);

  useEffect(() => {
    editorRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });
  }, []);

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
              <UserAvatar user={user} idx={idx} />
            </div>
          ))}
        </div>
        <button
          className="py-1	px-3 ml-8	text-white bg-[#33ADFF] hover:bg-[#238DE0] rounded-md"
          onClick={() => handlePublish()}
        >
          Publish
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
                {main[sectionId].dataComponent === 'guestBook' ? (
                  <CreateGuestBook
                    data={main[sectionId]}
                    sectionId={sectionId}
                    sectionIdx={sectionIdx}
                  />
                ) : (
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
                    handleEditorChange={() => handleEditorChange(editorData)}
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default EditorFrame;
