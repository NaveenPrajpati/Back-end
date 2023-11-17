import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  // Add other user fields as needed
});

const User = mongoose.model("user", userSchema);
export default User;
