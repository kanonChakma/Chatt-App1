import { Box } from "@chakra-ui/react";
import React from "react";
import ChatBox from "../component/ChatBox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chat = () => {
  const user = ChatState();
  console.log(user)
  return (
    <div>
      {user && <SideDrawer/>}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
         {user && <MyChats/>}
         {user && <ChatBox/>}
      </Box>
    </div>
  );
}



export default Chat;