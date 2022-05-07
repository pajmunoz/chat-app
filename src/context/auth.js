import { createContext } from "react"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVHnhknihDxnQ-pZvVrILdDPoe7kkif-Q",
  authDomain: "chat-app-e6142.firebaseapp.com",
  databaseURL: "https://chat-app-e6142-default-rtdb.firebaseio.com",
  projectId: "chat-app-e6142",
  storageBucket: "chat-app-e6142.appspot.com",
  messagingSenderId: "251663900300",
  appId: "1:251663900300:web:ced3fa7b12aeb22dbca5a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    console.log(app)
    return( <AuthContext.Provider value={{app}}>{children}</AuthContext.Provider>)
}