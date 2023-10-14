import addNewProjectCategoryModel from "../model/categoryModel.js"; // Import the Mongoose model for project categories.
import fs from "fs"; // Import the 'fs' module for file operations.

// A controller function for adding a new project.
export const addNewProjectController = async (req, res) => {
  try {
    // Destructure relevant data from the request 'fields' and 'files'.
    const { pname, topic, title, description } = req.fields;
    const { photo, pdf } = req.files;

    // Use a switch statement to validate the input data and file sizes.
    switch (true) {
      case !pname:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !topic:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !title:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less than 1mb!!!" });
      case !pdf && pdf.size > 30000000:
        return res
          .status(500)
          .send({ error: "PDF is Required and Should be less than 30mb!!!" });
    }

    // Create a new instance of the 'addNewProjectCategoryModel' Mongoose model with the request fields.
    const products = new addNewProjectCategoryModel({ ...req.fields });

    // If 'photo' and 'pdf' files exist, read and store their data and content types.
    if (photo && pdf) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;

      products.pdf.data = fs.readFileSync(pdf.path);
      products.pdf.contentType = pdf.type;
    }

    // Save the new project data to the database.
    await products.save();

    // Send a success response with the saved project details.
    res.status(201).send({
      success: true,
      message: "Project Added Successfully😘",
      products,
    });
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the process and send an error response.
    res.status(501).send({
      success: false,
      message: "Error in addNewController!!!",
      error,
    });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    // Query the database to find all projects (you should replace 'ProjectModel' with your actual Mongoose model for projects).
    const allProjects = await addNewProjectCategoryModel.find();

    // Send a success response with the array of all projects.
    res.status(200).json({ success: true, allProjects });
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the process and send an error response.
    res.status(500).json({ success: false, error: error.message });
  }
};
