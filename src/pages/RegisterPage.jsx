import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

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
    <div className="container">
      <h2 className="text-center">Regístrate por favor</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg my-3">
        <span className="input-group-text" id="inputGroup-sizing-lg">
            Email
          </span>
          <input
            type="text"
            name="email"
            placeholder="Email"
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
            placeholder="Password"
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
