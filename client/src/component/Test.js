import { Box, Button } from "@chakra-ui/react";

const Test = () => {
 return (
     <Box
     pb={3}
     px={3}
     fontSize={{ base: "28px", md: "30px" }}
     fontFamily="Work sans"
     d="flex"
     w="100%"
     justifyContent="space-between"
     alignItems="center"
     >
       this is chat
       <Button>
         hello
       </Button>
     </Box>
 )
}

export default Test;
