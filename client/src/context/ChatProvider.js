import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [selectedChat, setSelectedChat] = useState('');
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userIfno"));
      setUser(userInfo);
      if(!userInfo) {
          navigate("/login")
       }
    }, [navigate,setUser])

    return (<ChatContext.Provider value={
      {user, setUser,notification,setNotification, chats, setChats, selectedChat, setSelectedChat} }>
       {children}
      </ChatContext.Provider>
     );
};

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider;