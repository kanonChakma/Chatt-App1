import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";
import "./styles.css";


const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
    >
     <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  );
};

export default Chatbox;

