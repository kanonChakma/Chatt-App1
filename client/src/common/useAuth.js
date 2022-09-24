import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/allRoutes';

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