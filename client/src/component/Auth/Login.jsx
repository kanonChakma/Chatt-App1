import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../common/useAuth";

const Login = () =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let navigate = useNavigate();
  
  const submitHandler = async () => {
    setLoading(true);
    
    if (!email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }


    const userData ={ email,password}
    const {data} = await loginUser(userData);
    if(data.status === false) {
      toast({
        title: "Error Occured!",
        description:data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }else{
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    }
    // try {
    //   const {data} = await loginUser(userData);
    //   toast({
    //     title: "Login Successful",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    //   navigate("/chat");
    // } catch (error) {
    //   toast({
    //     title: "Error Occured!",
    //     description: error.response.data.message,
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    // }
  };

  const handleClick = () => setShow(!show);

  return (
    <VStack color="white" spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button
            bg="#376187"
            _hover={{bg:"#345777",color:"tomato"}}
            h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
      bg="#376187"
      _hover={{bg:"#345777",color:"tomato"}}
        width="100%"
        style={{ marginTop: "25px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="whatsapp"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Login as Guest User 
      </Button>
    </VStack>
  );
}

export default Login;

