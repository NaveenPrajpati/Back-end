import { log } from "console";
import ContactPeopleProjectCategorySchema from "../model/createContactPeopleModel.js"; // Import the Mongoose model for contact people and project categories.
import fs from "fs"; // Import the 'fs' module for file operations.

// A controller function for creating contact people and projects.
export const createContactPeopleController = async (req, res) => {
  try {
    // Destructure relevant data from the request 'fields' and 'files'.
    const {
      pCategory,
      topic,
      title,
      description,
      stipend,
      date,
      responsibility,
    } = req.fields;

    // Validation checks for required fields and file sizes
    if (
      !pCategory ||
      !topic ||
      !title ||
      !description ||
      !date ||
      !responsibility
    ) {
      return res.status(400).send({ error: "All fields are required." });
    }

    if (req.files) {
      const { photo, pdf } = req.files;

      if ((photo && photo.size > 5000000) || (pdf && pdf.size > 30000000)) {
        return res
          .status(400)
          .send({ error: "Photo size  and PDF size should be less than 1MB." });
      }
    }

    // Create a new instance of the 'ContactPeopleProjectCategorySchema' Mongoose model with the request fields.
    const product = new ContactPeopleProjectCategorySchema({ ...req.fields });

    // If 'photo' and 'pdf' files exist, read and store their data and content types.
    if (req.files && req.files.photo) {
      product.photo.data = fs.readFileSync(req.files.photo.path);
      product.photo.contentType = req.files.photo.type;
    }

    if (req.files && req.files.pdf) {
      product.pdf.data = fs.readFileSync(req.files.pdf.path);
      product.pdf.contentType = req.files.pdf.type;
    }

    // Save the new contact people and project data to the database.
    await product.save();

    // Send a success response with the saved contact people and project details.
    res.status(201).send({
      success: true,
      message: "Project Added Successfully😘",
      product,
    });
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the process and send an error response.
    res.status(501).send({
      success: false,
      message: "Error in createContactPeopleController!!!",
      error,
    });
  }
};

export const fetchContactPeopleController = async (req, res) => {
  try {
    // Fetch contact people and projects from the database.
    const contactPeople = await ContactPeopleProjectCategorySchema.find();
    // Send a success response with the fetched data.
    res.status(200).send({
      success: true,
      contactPeople,
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).send({
      success: false,
      message: "Error in fetchContactPeopleController",
      error,
    });
  }
};

export const updateContactPeopleController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.fields; // New data to update.

    // Find the contact person or project by ID and update its data.
    const updatedProduct =
      await ContactPeopleProjectCategorySchema.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

    // Send a success response with the updated data.
    res.status(200).send({
      success: true,
      message: "Contact Person or Project updated successfully",
      updatedProduct,
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).send({
      success: false,
      message: "Error in updateContactPeopleController",
      error,
    });
  }
};

export const deleteContactPeopleController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the contact person or project by ID and delete it.
    await ContactPeopleProjectCategorySchema.findByIdAndDelete(id);

    // Send a success response indicating the deletion.
    res.status(200).send({
      success: true,
      message: "Contact Person or Project deleted successfully",
    });
  } catch (error) {
    // Handle any errors and send an error response.
    res.status(500).send({
      success: false,
      message: "Error in deleteContactPeopleController",
      error,
    });
  }
};
