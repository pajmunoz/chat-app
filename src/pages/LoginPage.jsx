import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Gif from "../assets/images/giphy.gif"

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, loading, error, message, persistUser } =
    useContext(AuthContext);
  useEffect(() => {
    if (!persistUser()) {
      return navigate("/admin/login");
    } else {
      return navigate("/chat");
    }
    //eslint-disable-next-line
  }, []);
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
      const result = await loginUser(email, password);
      if (result === undefined) {
        return;
      } else {
        navigate("/chat");
      }
    } catch (error) {}
  };
  return (
    <div className="cont card bg-setup" style={{backgroundImage:`url(${Gif} )`}}>
      
      <h2 className="text-center">Inicia Sesión en PabliChat</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg my-3">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Email
          </span>
          <input
            type="text"
            name="email"
            placeholder="Escribe tu correo"
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
            placeholder="Escribe tu contraseña"
            value={newUser.password}
            onChange={handleInputChange}
            className="form-control form-control-lg"
          />
        </div>
        <div>
          {error && (
            <div className="alert alert-dark" role="alert">
              {message}
            </div>
          )}
          <button
            type="submit"
            value={loading ? "validadndo..." : "Registrarte"}
            className="btn btn-primary btn-lg"
          >
            {" "}
            Inicia Sesión
          </button>
        </div>
      </form>
      <p className="my-3">
        ¿No tienes una cuenta aún? {""}
        <Link to="/admin/register">Crear cuenta</Link>
      </p>
    </div>
  );
};

export default LoginPage;
