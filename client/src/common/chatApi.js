import axios from 'axios';
import { fetchAllChatsRoute, fetchGroupChatsRoute, getAllMessageRoutes } from '../utils/allRoutes';


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

  export const getAllMessage = async(selectedChatId,user) => {  
    return await axios.get (
        `${getAllMessageRoutes}/${selectedChatId}`,
         {
          headers: {
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }

  export const renameGroupChat = async(selectedChat,user,groupChatName) => {  
    return await axios.put (
        `${fetchAllChatsRoute}/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
         {
          headers: {
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }

  export const addUserToGroup = async(selectedChat,user,groupChatName) => {  
    return await axios.put (
        `${fetchAllChatsRoute}/add`,
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
         {
          headers: {
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }

  export const removeUserToGroup = async(selectedChat,user) => {  
    return await axios.put (
        `${fetchAllChatsRoute}/remove`,
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
         {
          headers: {
              Authorization: `Bearer ${user.token}`
            }
         }
      )
  }