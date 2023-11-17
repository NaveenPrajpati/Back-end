import uploadResumeModel from "../model/uploadResumeModel.js";
import jwt from "jsonwebtoken"; // Import JWT library
import User from "../model/userSchema.js";

import fs from "fs"; // Make sure to import the 'fs' module.

export const uploadResumeController = async (req, res) => {
  try {
    const { resume } = req.files;
    const token = req.headers.token;
    if(!token){
      return res.status(400).send({ message: 'token is missing' }); 
    }else{
      var verification=await jwt.verify(token,process.env.JWT_SECRET_KEY);
      console.log(verification);
      if(verification){
          const userData=await User.findOne({_id:verification.userId})
          if(!userData){
            res.status(404).send({ message: 'user not found' });
          }
      }
    }

    // Check if 'resume' exists and its size is less than 5MB (5 * 1024 * 1024 bytes).
    if (!resume || resume.size > 5 * 1024 * 1024) {
      return res
        .status(400)
        .send({ error: "Resume is required and should be less than 5 MB" });
    }

    // Read the file and store it in 'resumeData'.
    const resumeData = fs.readFileSync(resume.path);

    // Create an object to store resume details for database entry.
    const resumeDetails = {
      data: resumeData,
      contentType: resume.mimetype, // Use 'mimetype' to determine the content type.
      // Add other resume details if needed.
    };

    // Use 'uploadResumeModel' to save the resume in the database.
    await uploadResumeModel.create({resume:resumeDetails,user:verification.userId});

    // Send a success response.
    res
      .status(200)
      .send({ success: true, message: "Resume uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Upload resume Controller!!!",
      error: error.message, // Only send the error message for security reasons.
    });
  }
};
