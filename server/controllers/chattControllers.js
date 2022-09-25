import Chat from '../model/chatModel.js';
import User from '../model/userModel.js';

//--responsible for creating or fetching a one-on-one chat
export const accessChat = async(req, res) => {
  const { userId } = req.body;
  
  if(!userId) {
      console.log("userId not sent with request");
     return res.sendStatus(400);
   }
   
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
        {users: { $elemMatch: {$eq: req.user._id }}},
        {users: { $elemMatch: {$eq: userId }}},
    ]
  })
  .populate("users", "-password")
  .populate("latestMessage")

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username pic email"  
  });

  if(isChat.length > 0){
      res.send(isChat[0]);
  } else {
    var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
    };
 
    try {
        const createdChat = await Chat.create(chatData);
        const FullChat =  await Chat.findOne({id: createdChat._id}).populate(
            "users",
            "-password"
        );
        res.status(200).send(FullChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }    
  }
}

//get all userChats from chat model based on login user
export const fetchChats = async (req, res) => {
  try {
    Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")   
    .sort({updatedAt : -1})
    .then(async(results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "username pic email"
      })
      res.status(201).send(results);
    }); 
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }  
}








