import axios from 'axios';
import { fetchAllChatsRoute, fetchGroupChatsRoute } from '../utils/allRoutes';


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
  export const fetchGroupChat = async(groupChatName,user,selectedUsers) => {  
    return await axios.post (
        `${fetchGroupChatsRoute}`,
        {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
         {
          headers: {
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }