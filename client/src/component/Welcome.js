import { Box } from "@chakra-ui/react";
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
          <h1>
            Welcome, <span>{user.username}!</span>
           </h1>
         <h3>Please select a chat to Start messaging.</h3>
      </Box>
    );
  }

  export default Welcome;