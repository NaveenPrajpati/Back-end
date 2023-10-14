import PaperJournalModel from "../model/paperJournalSchema.js";
import fs from "fs"; // Make sure to import the 'fs' module.

// Controller for uploading a paper or journal with a topic and PDF file.
export const uploadPaper = async (req, res) => {
  // Extract the 'topic' and 'pdf' file from the request.
  const { topic } = req.fields;
  const { pdf } = req.files;

  // Check if a PDF file is provided in the request.
  if (!pdf) {
    return res.status(400).json({ error: "PDF file is required" });
  }

  // Read the content of the uploaded PDF file.
  const pdfData = fs.readFileSync(pdf.path);

  // Create an object containing the paper/journal details.
  const paperJournalDetails = {
    topic,
    pdf: {
      data: pdfData, // Store the binary data of the PDF.
      contentType: pdf.mimetype, // Store the content type (e.g., application/pdf).
    },
  };

  try {
    // Save the paper/journal details to the database using the 'PaperJournalModel'.
    await PaperJournalModel.create(paperJournalDetails);

    // Send a success response when the upload is complete.
    res
      .status(200)
      .json({ success: true, message: "Paper uploaded successfully" });
  } catch (error) {
    console.error(error);

    // Handle and report any errors that occur during the upload process.
    res.status(500).json({
      success: false,
      message: "Error in upload paper",
      error: error.message, // Send the error message for debugging purposes.
    });
  }
};
