import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVHnhknihDxnQ-pZvVrILdDPoe7kkif-Q",
  authDomain: "chat-app-e6142.firebaseapp.com",
  databaseURL: "https://chat-app-e6142-default-rtdb.firebaseio.com",
  projectId: "chat-app-e6142",
  storageBucket: "chat-app-e6142.appspot.com",
  messagingSenderId: "251663900300",
  appId: "1:251663900300:web:ced3fa7b12aeb22dbca5a9",
};

initializeApp(firebaseConfig);

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const createNewUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Debes llenar todos los campos");
        return;
      }
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(newUser, user);

      //mantener user en local storage
      localStorage.setItem('chat-user', JSON.stringify({email}));

      setLoading(false);
      return newUser;
    } catch (error) {
      //console.error('Error crando usuario',error)
      if (error.code === "auth/email-already-in-use") {
        setError(true);
        setMessage("El usuario que ingresaste ya existe");
        setLoading(false);
        return;
      } 
      
    } finally {
      setLoading(false);
    }
  };
  //login users
  const loginUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Debes llenar todos los campos");
        return;
      }
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //mantener user en local storage
      localStorage.setItem('chat-user', JSON.stringify({email}));
      setUser(signedInUser, user);
      setLoading(false);
      return signedInUser;
    } catch (error) {
        //console.error('error login user ', error)
        //console.error('Error creating user ',error)
        if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'|| error.code === 'auth/invalid-email') {
          setError(true);
          setMessage("Usuario/contraseña inválidos")
          setLoading(false);
          return;
        }
    } finally{
        setLoading(false)
    }
  };

  //user persistence

  const persistUser = () => {
    const userExists = localStorage.getItem('chat-user')
    //console.log(userExists)
    if (userExists) {
      const user= JSON.parse(userExists)
      setUser(user)
      return true
      
    }else {
      return false
    }
  }

  //sign Out user
  const signOut = () => {
    localStorage.removeItem('chat-user')
  }

  return (
    <AuthContext.Provider
      value={{ createNewUser, loading, error, message, loginUser, user, persistUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
