import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllMessage } from "../common/chatApi";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModel";
import "./styles.css";
import UpdateGroupChatModal from "./UpdateGroupChatModal";




const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {

      setLoading(true);
      const {data} = await getAllMessage(selectedChat._id, user);
      setMessages(data);
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setNewMessage("");
//         const { data } = await axios.post(
//           "/api/message",
//           {
//             content: newMessage,
//             chatId: selectedChat,
//           },
//           config
//         );
//         setMessages([...messages, data]);
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={{user: getSenderFull(user, selectedChat.users)}}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
               ScrollableChat
              </div>
            )}
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;