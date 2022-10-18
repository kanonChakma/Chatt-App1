import axios from "axios";
import { notificationRoutes } from "../utils/allRoutes";

export const getAlllNotification = async (chatId, user) => {
  return await axios.get(`${notificationRoutes}/${chatId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const createNotificaiton = async (chatId, user, recieverId) => {
  console.log(chatId, user, recieverId);
  return await axios.post(
    `${notificationRoutes}`,
    {
      recieverId: recieverId,
      chatId: chatId,
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};
