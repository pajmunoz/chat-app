import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVHnhknihDxnQ-pZvVrILdDPoe7kkif-Q",
  authDomain: "chat-app-e6142.firebaseapp.com",
  databaseURL: "https://chat-app-e6142-default-rtdb.firebaseio.com",
  projectId: "chat-app-e6142",
  storageBucket: "chat-app-e6142.appspot.com",
  messagingSenderId: "251663900300",
  appId: "1:251663900300:web:ced3fa7b12aeb22dbca5a9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  //state del chat provider
  const [chatData, setChatData] = useState({
    from: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);

  //guardando mensajes

  const sendMessage = async (from, message) => {
    try {
      if (message === "") return;
      const docRef = await addDoc(collection(db, "ChatDevApp"), {
        from: from,
        message: message,
        time: Date.now(),
      });
      return docRef;
    } catch (error) {
      //console.error("Error sending message", error);
    }
  };

  //get chat history

  const getChatHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ChatDevApp"));
      

      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          tempChatData.push({ id: doc.id, ...doc.data() });
          setChatData([...tempChatData]);
          setLoading(false);
      
          //console.log(chatData);
        }
        
      });
      const chatDiv = document.querySelector(".chat-scroll")
      window.scrollTo(0,chatDiv.scrollHeight)
    } catch (error) {
      console.log("error getting chat history", error);
    }
  };

  //update chat history

  const updateChatHistory = () => {
    const q = query(collection(db, "ChatDevApp"));
    onSnapshot(q, (querySnapshot) => {
      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        tempChatData.push({ id: doc.id, ...doc.data() });
        setChatData([...tempChatData]);
          setLoading(false);
      });
      const chatDiv = document.querySelector(".chat-scroll")
      window.scrollTo(0,chatDiv.scrollHeight)
    });
  };

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        getChatHistory,
        chatData,
        loading,
        updateChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
