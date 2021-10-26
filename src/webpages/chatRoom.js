import { useState } from "react";
import useChat from "./useChat";
import "./chatRoom.css";

const ChatRoom = (props) => {
  const { messages, sendMessage } = useChat(); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [myName, setMyName] = useState("Unnamed");
  const [provisory, setProvisory] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleMyName = (event) => {
    setProvisory(event.target.value);
  };

  const handleNameChange = () => {
    setMyName(provisory);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, myName);
    setNewMessage("");
  };

  return (
    <div>
      Mi nombre:
      <input value={provisory} onChange={handleMyName}></input>{" "}
      <button onClick={handleNameChange}>Cambiar</button>
      <div className="chat-room-container">
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.name === myName ? "my-message" : "received-message"
                }`}
              >
                {message.name}: {message.message}
                <div className={"details"}>
                  {new Date(message.date).toString("").slice(0, 24)}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
