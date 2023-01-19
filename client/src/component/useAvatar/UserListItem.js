import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const UserListItem = ({ user,handleFunction }) => {
  //const { user } = ChatState();
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      color="white"
      bg="linear-gradient(#6C5B7B,#C06C84)"
      _hover={{
        background: "#38B2AC",
      }}
      display="flex"
      alignItems="center"
      px={3}
      py={3}
      mb={2}
      mt={3}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.username}
        src={user.pic}
      />
      <Box>
        <Text>{user.username}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;