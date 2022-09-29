import { ViewIcon } from "@chakra-ui/icons";
import {
  Button, IconButton, Image, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const {username, email, pic} = user.user;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="350px">
          <ModalHeader
            fontSize="30px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="100px"
              src={pic}
              alt={username}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;