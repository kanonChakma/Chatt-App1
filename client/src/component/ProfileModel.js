import { ViewIcon } from "@chakra-ui/icons";
import {
  Button, IconButton, Image, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const {username, email, pic} = user;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton bg="#345777" _hover={{bg:"#345777", color:"tomato"}} display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal  size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#345777" color="white" h="330px">
          <ModalCloseButton />
          <ModalBody
          display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              marginTop="10px"
              borderRadius="full"
              height="115px"
              width="120px"
              
              src={pic}
              alt={username}
            />
            <Text
              height="5px"
              textAlign="start"
              fontWeight="bold"
              fontSize={{ base: "20px", md: "25px" }}
              fontFamily="Work sans"
            >
               Username :   {username}
            </Text>
            <Text
              fontWeight="bold"
              fontSize={{ base: "20px", md: "25px" }}
              fontFamily="Work sans"
            >
              Email : {email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button color="black" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;