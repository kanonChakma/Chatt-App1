import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { FormControl, IconButton, Input, InputGroup, InputLeftAddon, Spinner, useToast } from "@chakra-ui/react";
import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Lottie from "react-lottie";
import { io } from "socket.io-client";
import animationData from "../animations/typing.json";
import { createMessage, getAllMessage } from "../common/chatApi";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModel";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Welcome from "./Welcome";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  
  const { selectedChat, setSelectedChat, user,notification, setNotification } = ChatState();
  //emoji setting
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = newMessage;
    message += emojiObject.emoji;
    setNewMessage(message);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  //----connected socket io to backend
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))
  }, [])
  
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
           if(!notification.includes(newMessageRecieved)){
             setNotification([newMessageRecieved,...notification]);
             setFetchAgain(!fetchAgain);
           }   
        } else {
           setMessages([...messages, newMessageRecieved])
        }
    })
  })
  
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {

      setLoading(true);
      const {data} = await getAllMessage(selectedChat._id, user);
      setMessages(data);
      setLoading(false);
      
      socket.emit("join chat", selectedChat._id);
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

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const {data} = await createMessage(newMessage, user, selectedChat)
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setFetchAgain(!fetchAgain);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  
  const typingHandler = (e) => {
    setShowEmojiPicker(false);
    setNewMessage(e.target.value);
    //typing check
    if(!socketConnected) return;
    
    if(!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if(timeDiff >= 3000) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }  
    },timerLength)
  };
  
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;  
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
            boxShadow= "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
           
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
                    user={getSenderFull(user, selectedChat.users)}
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
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
           
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
                alignItems="center"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div
            className="emoji">
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
            <FormControl
             onKeyDown={sendMessage}
             id="first-name"
             isRequired
             mt={3}
            >
            {isTyping?(<div>
              <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  /></div>):(<></>)} 
            <InputGroup>
                <InputLeftAddon style={{background:"transparent"}} children= { <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />} />
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  onMouseDownCapture={()=>  setShowEmojiPicker(false)}
                />
             </InputGroup>
           </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Welcome/>
      )}
    </>
  );
};

export default SingleChat;