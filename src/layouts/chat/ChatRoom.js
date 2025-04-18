import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";

import { useRecoilValue } from "recoil";
import { NicknameState } from "../../recoil/NicknameState";
import { Stomp, Client } from "@stomp/stompjs";
import Grid from "@mui/material/Grid";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import axiosInstance from "../../apis/axios";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import MDAvatar from "../../components/MDAvatar";
import image from "../../assets/images/team-2.jpg";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";

const initState = {
  itemId: "",
  postId: "",
  title: "",
  itemImage: "",
  opponentNickname: "",
};

function ChatRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(initState);
  const [isLoading, setIsLoading] = useState(false); // 메시지 로딩 중인지
  const [hasMore, setHasMore] = useState(true); // 더 불러올 메시지가 있는지
  const [cursor, setCursor] = useState(null); // 가장 오래된 메시지 기준 커서
  const topRef = useRef(null);
  const messageListRef = useRef(null);

  const SERVER_URL = "http://localhost:8080/ws-stomp"; // STOMP 연결 엔드포인트
  const PUB_ENDPOINT = "/pub/chat/message"; // 메시지를 전송하기 위한 엔드포인트
  const SUB_ENDPOINT = `/sub/chat/room/${roomId}`; // 메시지를 수신하기 위한 엔드포인트

  // STOMP가 연결되고 생성한 Client를 관리하는 상태 관리
  const [wsClient, setWsClient] = useState();

  // 채팅에서 누적되는 데이터를 관리합니다.
  const [messages, setMessages] = useState([]);

  // 사용자의 구분을 짓기 위해 임시로 발급한 사용자 아이디
  const nickname = useRecoilValue(NicknameState);

  // 채팅에서 보내지는 데이터를 관리합니다.
  const [messageObj, setMessageObj] = useState({
    message: "",
    roomId: roomId,
    nickname: nickname,
  });

  /**
   * STOMP를 연결하고 라이프사이클을 관리하는 Handler
   */
  const stompHandler = (() => {
    return {
      connect: () => {
        // [STEP1] 연결 시 Client 객체를 생성합니다.
        const client = new Client({
          webSocketFactory: () => new SockJS(SERVER_URL),
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,

          // [STEP2] 웹 소켓 연결
          onConnect: (conn) => {
            console.log("[+] WebSocket 연결이 되었습니다.", conn);
            // [WebSocket - Subscribe] 특정 엔드포인트로 메시지를 수신합니다.
            client.subscribe(SUB_ENDPOINT, (message) => {
              console.log("수신:", JSON.parse(message.body));
              const receiveData = JSON.parse(message.body);
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  message: receiveData.message,
                  senderNickname: receiveData.senderNickname,
                  roomId: receiveData.roomId,
                  receiverNickname: receiveData.receiverNickname,
                },
              ]);
            });
          },
          // 웹 소켓 연결 종료
          onWebSocketClose: (close) => {
            console.log("[-] WebSocket 연결이 종료 되었습니다.", close);
          },
          // 웹 소켓 연결 에러
          onWebSocketError: (error) => {
            console.error("[-] 웹 소켓 연결 오류가 발생하였습니다.", error);
          },
          // STOMP 프로토콜 에러
          onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
          },
        });
        setWsClient(client); // 구성한 Client 객체를 상태 관리에 추가합니다.
        client.activate(); // Client를 활성화 합니다.

        return () => {
          stompHandler.disconnect(); // Socket 연결을 종료합니다.
        };
      },
      /**
       * 웹 소켓 메시지를 전송합니다.
       */
      sendMessage: () => {
        if (wsClient && wsClient.connected && messageObj.message.trim() !== "") {
          // [WebSocket - Publish] 특정 엔드포인트로 메시지를 전송합니다.
          console.log(messageObj);
          wsClient.publish({
            destination: PUB_ENDPOINT,
            body: JSON.stringify({ ...messageObj }),
          });
          // 입력한 값을 초기화합니다.
          setMessageObj({ ...messageObj, message: "" });
        }
      },
      /**
       * 웹 소켓 연결을 종료합니다.
       */
      disconnect: () => {
        console.log("[-] 웹 소켓 연결을 종료합니다.");
        if (wsClient) {
          wsClient.deactivate();
          setWsClient(undefined);
        }
      },
    };
  })();

  const handleChangeMessage = (message) => {
    setMessageObj({ ...messageObj, message: message });
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop === 0 && !isLoading && hasMore) {
      loadMessages(); // 최상단 도달 시 과거 메시지 로딩
    }
  };

  const loadMessages = async () => {
    if (isLoading || !hasMore) return;
    const container = messageListRef.current;
    const prevScrollHeight = container?.scrollHeight;

    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/room/${roomId}/messages`, {
        params: {
          cursor: cursor,
        },
      });

      const fetched = res.data;
      const newMessages = fetched.reverse();

      if (newMessages.length > 0) {
        const oldest = newMessages[0];
        setCursor(oldest.createdAt);
      } else {
        setHasMore(false);
      }

      setMessages((prev) => [...newMessages, ...prev]);

      setTimeout(() => {
        const newScrollHeight = container?.scrollHeight;
        if (container && newScrollHeight && prevScrollHeight) {
          container.scrollTop = newScrollHeight - prevScrollHeight;
        }
      }, 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoomInfo = async () => {
    const response = await axiosInstance.get(`/api/chat/room/${roomId}`);
    if (response.status === 200) {
      console.log(response.data);
      setRoomInfo(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getRoomInfo();
    stompHandler.connect();
    loadMessages();

    return () => {
      stompHandler.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!topRef.current || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMessages();
        }
      },
      {
        root: document.querySelector(".chat-scroll-container"),
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(topRef.current);

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <MDBox borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
              <MDBox p={2} display="flex" alignItems="center" justifyContent="space-between">
                <MDBox>
                  <IconButton
                    size="small"
                    disableRipple
                    sx={navbarIconButton}
                    variant="contained"
                    onClick={() => {
                      navigate("/chat");
                    }}
                  >
                    <Icon>arrow_back_ios_icon</Icon>
                  </IconButton>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDAvatar src={image} size="sm" />
                  <MDTypography ml={1} variant="button" color="text" fontWeight="bold">
                    {roomInfo.opponentNickname}
                  </MDTypography>
                </MDBox>
                <MDBox>
                  <MDButton variant="outlined" color="secondary" size="small">
                    거래완료
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox>
                <MainContainer
                  style={{ width: "100%", height: "550px", borderRadius: "0 0 10px 10px" }}
                >
                  <ChatContainer>
                    <MessageList
                      ref={messageListRef}
                      onScroll={handleScroll}
                      style={{
                        overflowY: "auto",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {messages.map((m, index) => (
                        <div ref={index === 0 ? topRef : null} key={index}>
                          <Message
                            key={index}
                            model={{
                              message: m.message,
                              direction: m.senderNickname === nickname ? "outgoing" : "incoming",
                              position: "single",
                            }}
                          />
                        </div>
                      ))}
                    </MessageList>
                    <MessageInput
                      placeholder="메세지 작성"
                      autoFocus={true}
                      attachButton={false}
                      value={messageObj.message}
                      onChange={handleChangeMessage}
                      onSend={stompHandler.sendMessage}
                    />
                  </ChatContainer>
                </MainContainer>
              </MDBox>
              {/*<div*/}
              {/*  style={{*/}
              {/*    flex: 1,*/}
              {/*    flexDirection: "column",*/}
              {/*    justifyContent: "center",*/}
              {/*    alignContent: "center",*/}
              {/*    alignItems: "center",*/}
              {/*    textAlign: "center",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <h1>STOMP을 이용한 채팅방입니다. </h1>*/}
              {/*  <div style={{ flexDirection: "row" }}>*/}
              {/*    <input*/}
              {/*      type="text"*/}
              {/*      value={messageObj.message}*/}
              {/*      onChange={(e) => setMessageObj({ ...messageObj, message: e.target.value })}*/}
              {/*      onKeyDown={(e) => {*/}
              {/*        if (e.keyCode === 13) {*/}
              {/*          stompHandler.sendMessage();*/}
              {/*        }*/}
              {/*      }}*/}
              {/*    />*/}
              {/*    <button onClick={stompHandler.sendMessage}>전송</button>*/}
              {/*  </div>*/}
              {/*  <div*/}
              {/*    style={{*/}
              {/*      display: "flex",*/}
              {/*      flexDirection: "column",*/}
              {/*      height: 300,*/}
              {/*      backgroundColor: "#f5d682",*/}
              {/*      border: "1px solid red",*/}
              {/*      margin: 20,*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    {messages.map((m, index) => (*/}
              {/*      <h1*/}
              {/*        style={{*/}
              {/*          fontSize: 13,*/}
              {/*          textAlign: "left",*/}
              {/*        }}*/}
              {/*        key={`messages-${index}`}*/}
              {/*      >*/}
              {/*        {m.senderNickname === nickname ? `[ME] ${m.message}` : `[OTHER] ${m.message}`}*/}
              {/*      </h1>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</div>*/}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ChatRoom;
