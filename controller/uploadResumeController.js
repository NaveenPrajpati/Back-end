import uploadResumeModel from "../model/uploadResumeModel.js";

import fs from "fs"; // Make sure to import the 'fs' module.

export const uploadResumeController = async (req, res) => {
  try {
    const { resume } = req.files;

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
    await uploadResumeModel.create(resumeDetails);

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
