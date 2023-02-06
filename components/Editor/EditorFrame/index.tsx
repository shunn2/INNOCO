import React, { useEffect, useRef, useState } from 'react';
import { getInsertLocation } from '@utils/getInsertLocation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { withMainData, withSectionOrder } from '@recoil/editor';
import {
  dragElementToElement,
  dragElementToSection,
  dragOuterElementToElement,
  dragOuterElementToSection,
  dragOuterSection,
  dragSection,
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
import { createParent, CreateSection } from '@utils/createElement';

const EditorFrame = () => {
  //============
  const router = useRouter();
  const { projectId, pageId } = router.query;
  // useEffect(() => {
  //   console.log('project', projectId);
  //   console.log('page', pageId);
  // }, [projectId, pageId]);
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
  const [session] = useSession();
  // useEffect(() => {
  //   console.log(session);
  // }, [session]);
  const stompClient = useRef(null);
  const [editorExists, setEditorExists] = useState(false);
  const [viewerExists, setViewerExists] = useState(false);
  //FIXME: editorExists를 에디터 접속 전에 판단하는 로직 유무
  const [newUserName, setNewUserName] = useState('');
  const [userAuthority, setUserAuthority] = useState<string>('');
  const [authority, setAuthority] = useState(projectInfo.authority);
  const [isSynced, setIsSynced] = useState();
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
    console.log('atom', data);

    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: pageId,
        messageType: 'EDIT',
        eventType: 'CONTENT_CHANGE',
        content: JSON.stringify(data),
        sender: projectInfo.name,
      }),
    });
  }

  //새로운 유저가 입장했을 때 자신의 정보를 다른 유저들에게 메세지로 전달함
  function userJoin() {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: pageId,
        messageType: 'SUBSCRIBE',
        eventType: 'USER_JOIN_EVENT',
        authority: userAuthority,
        sender: projectInfo.name,
        subscribers: users,
      }),
    });
  }

  //본인이 단독 에디터라면 새로운 유저에게 본인의 컨텐츠를 전송함
  function sendCurrentEditorContent(newUser, content) {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: pageId,
        messageType: 'EDIT',
        eventType: 'SET_INITIAL_CONTENT',
        content: content,
        sender: projectInfo.name,
        receiver: newUser, //타겟이 되는 새로운 유저에게 메세지를 받을 수 있도록 세팅
      }),
    });
  }

  //위임 기능에서 사용
  function findEditorCandidateList() {
    stompClient.current.publish({
      destination: SEND_URL,
      body: JSON.stringify({
        pageId: pageId,
        messageType: 'AUTHORITY',
        eventType: 'FIND_EDITOR_CANDIDATE_LIST',
        sender: projectInfo.name,
      }),
    });
  }

  function isNewUserNeedsToSetInitialContent(message) {
    //본인이 방금 들어와 에디터의 내용이 비어있는 새로운 유저인지 확인
    let evt = JSON.parse(message.body).eventType;
    let targetUserId = JSON.parse(message.body).receiver;
    return targetUserId === projectInfo.name && evt === 'SET_INITIAL_CONTENT';
  }

  //에디터 진입 시 최초로 웹소켓 서버와 연결이 일어남.
  //CONNECT-SUBSCRIBE 순서로 연결됨.
  const editorConnect = () => {
    console.log('ab');

    stompClient.current = new StompJS.Client({
      brokerURL: CONNECTION_URL,
      debug: function (str) {
        console.log(str);
      },
      connectHeaders: {
        Authorization: 'Bearer ',
        UserName: projectInfo.name,
      },
      onConnect: () => {
        //connect를 실행할 때 발생함
        console.log('connection start');
        setIsConnected(true);
        stompClient.current.subscribe(
          //특정 채널 구독 시작
          EDITOR_SUBSCRIBE_URL + '63db6d1c210f8e6f36b399d3',
          (message) => {
            console.log('sdfsdfs', message.body);
            if (isUserJoinEvent(message)) {
              //새로운 유저가 입장하는 이벤트 발생
              console.log(JSON.parse(message.body).subscribers);
              setUsers(JSON.parse(message.body).subscribers);

              if (
                projectInfo.name === JSON.parse(message.body).currentEditorId
              ) {
                //서버에 거쳐서 확인한 본인의 권한이 에디터라면 세팅

                if (JSON.parse(message.body).sender !== projectInfo.name) {
                  //방금 들어온 유저가 본인이 아니라면 현재 에디터에 편집하고 있는 내용을 새로운 유저에게 전송
                  setIsNewUserJoin(true);
                  setNewUserName(JSON.parse(message.body).sender);
                } else {
                  //본인이 에디터에 방금 입장해서 Edit 권한을 최초로 획득한 사람이라면 == DB
                  setEditorExists(true);
                }
                return;
              }

              //이미 에디터가 입장해 있는데 에디터 권한으로 들어왔다면 - 뷰어로 변경하는 로직 구현
              if (
                JSON.parse(message.body).isAuthorityChanged === true &&
                JSON.parse(message.body).sender === projectInfo.name
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
                JSON.parse(message.body).isAuthorityChanged === false &&
                JSON.parse(message.body).authority === 'VIEWER' &&
                JSON.parse(message.body).sender === projectInfo.name
              ) {
                setViewerExists(true);
              }
            }

            if (isNewUserNeedsToSetInitialContent(message)) {
              //본인이 방금 입장하여 최초로 에디터에 내용을 세팅해야 하는 유저라면 에디터가 보낸 메세지를 받아서 세팅함.
              setMain(JSON.parse(message.body).content.main);
              setSectionOrder(
                JSON.parse(JSON.parse(message.body).content).sectionOrder
              );

              return;
            }

            if (isUserDisconnectEvent(message)) {
              setUsers(JSON.parse(message.body).subscribers);

              return;
            }

            //USER 입장/퇴장 이벤트를 제외하고 텍스트를 편집하는 이벤트의 경우에는 에디터에 콘텐츠 세팅
            console.log('change1');
            if (JSON.parse(message.body).eventType === 'CONTENT_CHANGE') {
              setMain(JSON.parse(JSON.parse(message.body).content).main);
              setSectionOrder(
                JSON.parse(JSON.parse(message.body).content).sectionOrder
              );
            }
          }
        );
        userJoin();
      },
      onDisconnect: () => {
        //웹소켓 연결 끊어질 때에는 서버에 자동으로 전송되어 처리할 필요는 없음
        console.log('disconnected');
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    stompClient.current.activate();
  };

  const getSync = async () => {
    const { data } = await api.getProjectSync(projectId);
    setIsSynced(data.value);
  };

  // useEffect(() => {
  //   let authority = projectInfo.authority;
  //   if (authority === 'OWNER') authority = 'EDITOR';
  //   setUserAuthority(authority);
  //   console.log('autd', userAuthority);
  //   editorConnect();
  // }, []);

  useEffect(() => {
    setJoinedUserCount(users.length);
  }, [users]); //최초 연결 시 + 현재 최초로 입장한 유저일 때 데이터 로딩받음

  useEffect(() => {
    console.log('Imviewer', viewerExists);
    console.log('ImEditor', editorExists);

    //편집중인 에디터가 없어 DB 저장 내역을 받아와야 할 때
    if (isSynced || viewerExists) {
      axios
        .get(
          `https://api-dev.onstove.com/innoco/projects/${projectId}/pages/${pageId}?source=SAVED`
        )
        .then((response) => {
          console.log('change2');
          setMain(response.data.value.pageJson.main);
          setSectionOrder(response.data.value.pageJson.sectionOrder);
        });
      return;
    }

    if (editorExists) {
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
            console.log('res', response);

            console.log('chanSge3');
            setMain(JSON.parse(response.data.value.pageJson).main);
            setSectionOrder(
              JSON.parse(response.data.value.pageJson).sectionOrder
            );
          });
      });
    }
  }, [editorExists, viewerExists]);

  useEffect(() => {
    //만약 새로운 유저가 들어왔다면, 현재 작성중인 에디터의 컨텐츠를 전송함.
    if (newUserName !== '') {
      sendCurrentEditorContent(newUserName, main);
      console.log('방금 들어온 유저:', newUserName);
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

  useEffect(() => {
    editorRef.current.scrollIntoView({
      behavior: 'auto',
      inline: 'center',
    });
  }, []);

  return (
    <div
      style={{
        width: '4000px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
      ref={editorRef}
    >
      <div id="test" style={{ width: '1000px' }}>
        {sectionOrder.map((sectionId, sectionIdx) => {
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
                  handleElementClick(e, sectionId, sectionIdx, main[sectionId])
                }
                handleEditorChange={() => handleEditorChange(ed)}
              >
                {main[sectionId].children.map((element, elementIdx) => (
                  <div key={element.id}>
                    {element.id === currentSelectedElement.id && (
                      <ElementControlWidget />
                    )}
                    {createParent({
                      element,
                      elementIdx,
                      sectionId,
                      insertLocation,
                      draggingOver,
                      handleDragOver(e) {
                        handleDragOver(e, element, sectionId, elementIdx);
                      },
                    })}
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
