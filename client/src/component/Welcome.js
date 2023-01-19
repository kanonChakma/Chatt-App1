import { Box, Text } from "@chakra-ui/react";
import Robot from "../assets/robot.gif";
import { ChatState } from "../context/ChatProvider";

const Welcome = () =>{
  const {  user } = ChatState();
    return (
      <Box
       display="flex"
       justifyContent="center"
       alignItems="center"
       color="black"
       flexDirection="column"
      >
          <img style={{height: "20rem"}} src={Robot} alt="" />
           <Text fontSize='15px' color='dark'>
              {user.username}
           </Text>
           <Text fontSize='20px' color='tomato'>
             Select a chat to start messaging
           </Text>
      </Box>
    );
  }

  export default Welcome;