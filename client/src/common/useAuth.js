import axios from 'axios';
import { registerRoute } from '../utils/allRoutes';

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