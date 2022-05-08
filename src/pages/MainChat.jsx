import React,{ useContext, useEffect} from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const MainChat = () => {
  const navigate = useNavigate()
  const {user, persistUser, signOut} = useContext(AuthContext)
  console.log(user)
  useEffect(() =>{
    if (!persistUser()) {
      return navigate('/admin/login')
    } 
    //eslint-disable-next-line
  }, [])

  const signUserOut =()=> {
    signOut()
    navigate('/admin/login')
  }

  return (
    <div className="chat container bg-light">
      <div className="d-flex justify-content-between">
        <p>
          Iniciaste Sesión como <b> email@email.com</b>
        </p>
        <button onClick={signUserOut}>
          <i>Salir del chat </i>
          <b>(Log Out)</b>
        </button>
      </div>
      <h2>Chat</h2>
      {/*Chat del Usuario*/}
      <div className="user-chat card text-end w-75 float-end my-3 bg-primary text-light">
        <div className="card-body">
          <div className="chat-info card-title ">
            email@email.com en <span> 1 de enero de 2022</span>
          </div>
          <div className="chat-message card-text">Mensaje del user</div>
        </div>
      </div>

      {/*sender chat*/}
      <div className="sender-chat card text-start w-75 my-3 bg-secondary text-light">
        <div className="card-body">
          <div className="chat-info card-title ">
            email@email.com en <span> 1 de enero de 2022</span>
          </div>
          <div className="chat-message card-text">Mensaje del user</div>
        </div>
      </div>
      {/* chat form */}
      <div className="chat-form-container">
        <form className="chat-form">
          <div className="input-group">
            <input
              type="text"
              className="chat-input form-control form-control-lg"
              valor="valor"
              //onChange={this.}
            />
            <button className="btn btn-outline-primary btn-lg">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainChat;
