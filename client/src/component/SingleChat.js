import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { FormControl, IconButton, Input, InputGroup, InputLeftAddon, InputRightElement, Spinner, useToast } from "@chakra-ui/react";
import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";
import Lottie from "react-lottie";
import { io } from "socket.io-client";
import animationData from "../animations/typing.json";
import { createMessage, getAllMessage } from "../common/chatApi";
import { createNotificaiton } from "../common/notificationApi";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModel";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Welcome from "./Welcome";
import { imageUplaod } from "../common/imageUplaod";


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
  const[selectedFile, setSelectedFile] = useState(false);
  const [pic, setPic] = useState('');

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
   

  const handleEmojiClick = (event, emojiObject) => {
    let message = newMessage;
    message += emojiObject.emoji;
    setNewMessage(message);
    console.log(message);
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
  
  const createNoti = async(message) => { 
    console.log({message});
    let arr = [];
    message.chat.users.map((user) => arr.push(user._id))

     const res = await createNotificaiton(message.chat._id, user, arr);
     console.log(res.data);
     return res;
  }

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
    if (newMessage.length>0 || pic.length>0) {
      console.log("hello woel")
      socket.emit("stop typing", selectedChat._id);
      try {
        const {data} = await createMessage(user,{content: newMessage, chatId: selectedChat._id, pic})
        console.log({data});
        setPic('')
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
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
              bg="#345777"
              _hover={{bg:"#345777", color:"tomato"}}
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
           
            w={{base:"100%", lg:"90%"}}
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
            {
              selectedFile? ( <Spinner  speed='0.65s'
              emptyColor='gray.200'
              color='blue.50'
               size='xs' />) : (<div>
                 {pic?(<div>
                  <img alt="chat-img" style={{width:"150px", height:"50px"}} src={pic} />
                      <br />
                 <button>Remove</button>
                  </div>): " "}
              </div>
              )}
            <div
            className="emoji">
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
            <FormControl
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
            <InputGroup
            boxShadow = "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
            >
            <InputLeftAddon style={{background:"transparent", border:"none"}} children= { <label
              style={{display:"flex"}}
              >
              <input type="file" style={{visibility: "hidden", width:0, height:0}} name="myImage" onChange={(event) => {
                imageUplaod(event.target.files[0], setPic, setSelectedFile, toast)
                }
              }/>
              <BiImageAdd/>
              </label> } />
            
                <InputLeftAddon style={{background:"transparent", border:"none"}} children= { <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />} />
                <Input
                  bg="transparent"
                  _hover={{bg: "transparent"}}
                  variant="filled"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  onMouseDownCapture={()=>  setShowEmojiPicker(false)}
                />
                <InputRightElement children={<AiOutlineSend color='green.500'   onClick={sendMessage}/>} />
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