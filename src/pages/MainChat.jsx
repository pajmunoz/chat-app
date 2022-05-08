/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/auth";
import { ChatContext } from "../context/chat";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

const MainChat = () => {
  const navigate = useNavigate();
  const { user, persistUser, signOut } = useContext(AuthContext);

  const { sendMessage, getChatHistory, chatData, loading, updateChatHistory } =
    useContext(ChatContext);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [messageToSave, setMessageToSave] = useState("");
  //console.log(user);
  useEffect(() => {
    if (!persistUser()) {
      return navigate("/admin/login");
    }
    getChatHistory();
    //eslint-disable-next-line
  }, []);

  //console.log(chatData);

  const signUserOut = () => {
    signOut();
    navigate("/admin/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = user;
    await sendMessage(email, messageToSave);
    updateChatHistory();
    setMessageToSave("");
  };

  const chatHistory =
    chatData.length > 0
      ? chatData.sort((a, b) => {
          return a.time - b.time;
        })
      : null;

  if (loading) {
    return (
      <div className="spin">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="chat bg-light">
      <div className="head-top">
        <div className="nav-top d-flex justify-content-between bg-light row">
          <p className="col">
            Iniciaste Sesión como <b> {user?.email}</b>
          </p>
          <button className="btn btn-dark col" onClick={signUserOut}>
            <i>Salir del chat </i>
            <b>(Log Out)</b>
          </button>
        </div>
      </div>
      <h2>Chat</h2>
      <div className="chat-scroll">
        {/*Chat del Usuario*/}
        {chatHistory?.map((c) => {
          return c.from === user.email ? (
            <div
              key={c.time}
              className="user-chat card text-end w-75 float-end my-3 bg-primary text-light"
            >
              <div className="card-body">
                <div className="chat-info card-title ">
                  {c.from} en{" "}
                  <span>
                    {" "}
                    <Moment locale="es" format="MMMM DD, YYYY HH:mm">
                      {c.time}
                    </Moment>
                  </span>
                </div>
                <div className="chat-message card-text">{c.message}</div>
              </div>
            </div>
          ) : (
            <div
              key={c.time}
              className="sender-chat card text-start w-75 my-3 bg-secondary text-light"
            >
              <div className="card-body">
                <div className="chat-info card-title ">
                  {c.from} en{" "}
                  <span>
                    {" "}
                    <Moment locale="es" format="MMMM DD, YYYY HH:mm">
                      {c.time}
                    </Moment>
                  </span>
                </div>
                <div className="chat-message card-text">{c.message}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* chat form */}
      <div className="chat-form-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <div className="input-group">
            <input
              type="text"
              className="chat-input form-control form-control-lg"
              value={messageToSave}
              onChange={(e) => setMessageToSave(e.target.value)}
            />
            <button className="btn btn-primary btn-lg">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainChat;
