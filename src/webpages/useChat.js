import { useEffect, useState, useRef } from "react";
const socketIOClient = require("socket.io-client");
const SOCKET_SERVER_URL =
  "ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl";

const NEW_CHAT_MESSAGE_EVENT = "CHAT"; // Name of the event

const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(SOCKET_SERVER_URL);
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      date: Date.now().toString(),
      message: messageBody,
      name: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
