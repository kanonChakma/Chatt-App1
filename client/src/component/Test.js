import { Box, Button, Flex } from "@chakra-ui/react";

const Test = () => {
 return (
   <>

     <Box
     pb={3}
     px={3}
     fontSize={{ base: "28px", md: "30px" }}
     fontFamily="Work sans"
     display="flex"
     width="100%"
     justifyContent="space-between"
     alignItems="center"
     >
       this is chat
       <Button>
         hello
       </Button>
     </Box>
    <Flex
    pb={3}
    px={3}
    fontSize={{ base: "28px", md: "30px" }}
    fontFamily="Work sans"
    d="flex"
    w="100%"
    justifyContent="space-between"
    alignItems="center"
    >
          
    <p>Fisrt</p>
    <Box display ={{ base:"none", md: "flex" }}>
      <p>second</p>
    </Box>
    <Button>
      hello
    </Button>
    </Flex>
     </>
     )
}

export default Test;
