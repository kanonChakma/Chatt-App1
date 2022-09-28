import Messages from "../model/messageModel.js";

export const getAllMessages = async (req, res) => {
   try {
    const message = await Messages.find({chat: req.params.chatId})
    .populate("sender", "name pic email")
    .populate("chat")

    res.json(message);
   } catch (error) {
     res.status(400);
     throw new Error(error.message); 
   }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};