import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { useState } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { useNavigate } from "react-router-dom";
import { oneToOneChat } from "../common/chatApi";
import { getAllUser } from "../common/useAuth";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import ProfileModal from "./ProfileModel";
import UserListItem from "./useAvatar/UserListItem";

function SideDrawer() {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await getAllUser(search, user);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {

    try {
      setLoadingChat(true);
      const { data } = await oneToOneChat(userId, user);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="dark"
        w="100%"
        p="20px"
        color="white"
        boxShadow="rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
      >
        <Tooltip label="Search Users to chat" size="xs"  placement="bottom-end">
          <Button  bg ="#345777" _hover={{ bg:"#345777"}} variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text textTransform="uppercase" fontSize="2xl">
          Share-Talk
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList 
            bg ="#345777"
            color= "tomato"
            border="none"
            pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu
          >
            <MenuButton  as={Button} _hover={{ bg: "#345777", color: " white" }} _focus={{bg: "#345777"}} bg="#345777" rightIcon={<ChevronDownIcon _focus={{bg: "#345777"}} />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.username}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg="#345777" border="none">
              <ProfileModal user={user}>
                <MenuItem _focus={{bg: "#345777"}} _hover={{ bg: "#345777", color: "tomato" }}>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem _focus={{bg: "#345777"}}  _hover={{ bg: "#345777", color: "tomato" }} onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Box
      backgroundColor={`linear-gradient(#355C7D,#6C5B7B,#C06C84)`}
      backgroundImage={`linear-gradient(#355C7D,#6C5B7B,#C06C84)`}
      bg="linear-gradient(#355C7D,#6C5B7B,#C06C84)"
      bgImg={`linear-gradient(#355C7D,#6C5B7B,#C06C84)`}
      bgColor="dark"
      >
      <Drawer
      placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="dark" color="white">
          <DrawerHeader textAlign="center" borderBottomWidth="1px" textTransform="uppercase">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                mt={3}
                color="tomato"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              _hover={{bg:"linear-gradient(#6C5B7B,#C06C84)"}}
              bg="linear-gradient(#6C5B7B,#C06C84)"
              width="100%" 
              borderRadius="0"
              mt={4} onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Box>
    </>
  );
}

export default SideDrawer;