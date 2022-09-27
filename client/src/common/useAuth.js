import axios from 'axios';
import { allUsersRoute, loginRoute, registerRoute } from '../utils/allRoutes';

export const registerUser=async(data)=>{
    return await axios.post(
        `${registerRoute }`,
         {data},
        {
          headers: {
                "Content-type": "application/json",
            }
         }
      )
  }

  export const  loginUser=async(data)=>{
    return await axios.post(
        `${loginRoute }`,
         {data},
        {
          headers: {
                "Content-type": "application/json",
            }
         }
      )
  }
  
  export const  getAllUser=async(search, user)=>{
    return await axios.get(
        `${allUsersRoute}?search=${search}`,
        {
          headers: {
              Authorization: `Bearer ${user.token}`,
            }
         }
      )
  }