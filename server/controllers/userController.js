import bcrypt from 'bcrypt';
import User from "../model/userModel.js";

export const register = async (req, res, next) => {
        const { username, email, password } = req.body;
        if(!username || !email || password) {
          return res.json({
            msg: "Please Enter all the Fields",
            status: 400
          })
        }
        //email check
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
          return res.json({ 
            msg: "Email already used", 
            status: 400 });
        }
        
          const hashedPassword = await bcrypt.hash(password, 10);
        //create user  
        const user = await User.create ({
          email,
          username,
          pic,
          password,
        });
        delete user.password;
        
      if(user) {
        return res.json({ 
          status: 201, 
          user 
        });

      }else {
         res.status(400) 
         throw new Error("Failed to create"); 
      }
}

export const login = async(req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
}

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const logOut = async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
     await User.deleteOne(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};