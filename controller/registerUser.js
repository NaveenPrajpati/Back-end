import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT library
import User from "../model/userSchema.js";

export const register = async (req, res, next) => {
  try {
    // Extract user input data from the request body
    const { username, email, collegeName, password } = req.body;

    // Check if a user with the same username already exists
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      // If a user with the same username exists, return an error response
      return res.json({ msg: "UserName Already Used", status: false });
    }

    // Check if a user with the same email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      // If a user with the same email exists, return an error response
      return res.json({ msg: "Email Already used", status: false });
    }

    // Hash the user's password with a salt factor of 10 (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the database with the hashed password
    const user = await User.create({
      email,
      username,
      collegeName,
      password: hashedPassword,
    });

    // Remove the password field from the user object before sending the response
    delete user.password;

    // Send a success response with the newly created user
    return res.json({ status: true, user });
  } catch (ex) {
    // If an error occurs during the registration process, pass it to the error handler
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    // Extract user input data (email and password) from the request body
    const { email, password } = req.body;

    // Find a user in the database with the provided email
    const user = await User.findOne({ email });

    // If no user with the provided email is found, return an error response
    if (!user)
      return res.json({ msg: "Incorrect email or password", status: false });

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the provided password is invalid, return an error response
    if (!isPasswordValid)
      return res.json({
        msg: "Incorrect email and password",
        status: false,
      });

    // If both email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour (you can adjust this)
    });

    // Remove the password field from the user object
    delete user.password;

    // Send a success response with the token and authenticated user
    return res.json({ status: true, user, token });
  } catch (ex) {
    // If an error occurs during the login process, pass it to the error handler
    next(ex);
  }
};

export const logout = (req, res) => {
  try {
    // Assuming you send the token in an HTTP header or as a cookie
    const token = req.headers.authorization; // Adjust this based on how you send the token
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized", status: false });
    }

    // Blacklist or invalidate the token, so it can't be used again
    // This can be done by storing the token in a database, Redis, or another data store
    // When a user logs out, you add the token to the blacklist

    // Respond with a successful logout message
    return res.json({ msg: "User logged out successfully", status: true });
  } catch (ex) {
    // If an error occurs during the logout process, handle it appropriately
    console.error(ex);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", status: false });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Extract the user ID and password from the request.
    const userId = req.params.userId;
    const { password } = req.body;

    // Find the user in the database based on the user ID.
    const user = await User.findById(userId);

    if (!user) {
      // If the user does not exist, return an error response.
      return res.status(404).json({ msg: "User not found", status: false });
    }
    // Validate the provided password against the user's stored password.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the provided password is incorrect, return an error response.
      return res.status(401).json({ msg: "Incorrect password", status: false });
    }

    // If the password is correct, delete the user from the database.
    await User.deleteOne({ _id: userId });

    // Send a success response indicating that the user has been deleted.
    return res.json({ msg: "User deleted successfully", status: true });
  } catch (ex) {
    // If an error occurs during the deletion process, pass it to the error handler.
    next(ex);
  }
};
