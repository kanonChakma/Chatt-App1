
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register";

const Home = () =>{
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log("In Home",user)
    if(user){
      navigate("/chat")      
    }
  }, [navigate])
 return(
    <Container maxW="xl" centerContent>
    <Box
      display="flex"
      justifyContent="center"
      p={3}
      bg="white"
      width="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="Work sans">
        Talk-A-Tive
      </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
 )
}

export default Home;

