import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";



const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          
          //const base64String = `data:${m.img.contentType};base64,${m.img.data.data.toString('base64')}`;
          <div style={{ display: "flex" }} key={m._id}>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Tooltip label={m.sender.username} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.username}
                src={m.sender.pic}
              />
            </Tooltip>
          )}
          
          <span
            style={{
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
            }}
          > {
            m.pic?<>
            <img width="200" height="100" src={m.pic} alt="img"></img>
            </>:<>
            </>
          }
            {m.content}
          </span>
        </div> 

        ) )}
    </div>
  );
};

export default ScrollableChat;

//<img width="200" height="100" src={ window.URL.createObjectURL(new Blob([Int8Array.from(m.img.data.data)], {type: m.img.contentType }))} alt="img"></img>
//let image = `data:${m.img.contentType};base64,${m.img.data.data.toString('base64')}`;
//let img = `data:${m.img.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(m.img.data.data)))}
//let img = data:${m.img.contentType};base64,${m.img.data.data.toString('base64')};