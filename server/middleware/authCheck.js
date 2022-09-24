import User from "../model/userModel.js";

export const authCheck = async(req, res, next) => {
   try {
        const { username, email } = req.body;
        
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
        const emailCheck = await user.findOne({ email });
        if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
       next();
    }catch (err) {

   }
}