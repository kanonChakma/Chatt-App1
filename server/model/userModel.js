import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: "String", required: true },
  email: { type: "String", unique: true, required: true, unique: true },
  password: { type: "String", required: true },
  pic: {
    type: "String",
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
   },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
 },
{ timestaps: true }
);

const User = mongoose.model("User", userSchema);
export default User;