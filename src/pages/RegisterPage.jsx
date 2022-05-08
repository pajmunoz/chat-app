import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Gif2 from "../assets/images/giphy2.gif"

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createNewUser, loading, error, message, persistUser } = useContext(AuthContext);

  useEffect(() =>{
    if (!persistUser()) {
      return navigate('/admin/register')
    } else{
      return navigate('/chat')
    }
    //eslint-disable-next-line
  }, [])

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = newUser;
      const result = await createNewUser(email, password);
      if (result === undefined) {
        return;
      } else {
        navigate("/chat");
      }
    } catch (error) {
      console.error("error creating user", error);
    }
  };

  return (
    <div className="cont card bg-setup" style={{backgroundImage:`url(${Gif2} )`}}>
      <h1 className="text-center display-2">PabliChat</h1>
      <h2 className="text-center">Crea una cuenta</h2>
      <p className="text-center">Es rápido y fácil</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg my-3">
        <span className="input-group-text" id="inputGroup-sizing-lg">
            Email
          </span>
          <input
            type="text"
            name="email"
            placeholder=""
            value={newUser.email}
            onChange={handleInputChange}
            className="form-control form-control-lg"
          />
        </div>
        <div className="input-group input-group-lg my-3">
        <span className="input-group-text" id="inputGroup-sizing-lg">
            Contraseña
          </span>
          <input
            type="new-password"
            name="password"
            placeholder=""
            value={newUser.password}
            onChange={handleInputChange}
            className="form-control form-control-lg"
          />
        </div>
        <div className="text-center">
          {error && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <button
            type="submit"
            value={loading ? "validadndo..." : "Registrarte"}
            className="btn btn-success btn-lg"
          >
            {" "}
            Registrarte
          </button>
        </div>
      </form>
      <p className="my-3">
        {""}
        <Link to="/admin/login">¿Ya tienes una cuenta?</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
