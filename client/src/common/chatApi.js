import axios from 'axios';
import { fetchAllChatsRoute } from '../utils/allRoutes';


export const fetchAllChats = async(user) => {  
    return await axios.get (
        `${fetchAllChatsRoute}`,
         {
          headers: {
             Authorization: `Bearer ${user.token}`,
            }
         }
      )
  }

  export const oneToOneChat = async(userId,user) => {  
    return await axios.post (
        `${fetchAllChatsRoute}`,
         {userId},
         {
          headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }
