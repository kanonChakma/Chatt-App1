import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useContext('');
    const navigate = useNavigate();

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userIfno"));
      setUser(userInfo);
      if(!userInfo) {
          navigate("/login")
       }
    }, [navigate,setUser])

    return (<ChatContext.Provider value={{user, setUser}}>
       {children}
      </ChatContext.Provider>
     );
};

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider;