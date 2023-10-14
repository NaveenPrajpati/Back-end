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
    const { photo, pdf } = req.files;

    // Use a switch statement to validate the input data and file sizes.
    switch (true) {
      case !pCategory:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !topic:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !title:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !stipend:
        return res.status(500).send({ error: "Stipend is Required!!!" });
      case !date:
        return res.status(500).send({ error: "Date is Required!!!" });
      case !responsibility:
        return res.status(500).send({ error: "Responsibility is Required!!!" });
      case !photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is Required and Should be less than 1mb!!!",
        });
      case !pdf && pdf.size > 30000000:
        return res
          .status(500)
          .send({ error: "PDF is Required and Should be less than 30mb!!!" });
    }

    // Create a new instance of the 'ContactPeopleProjectCategorySchema' Mongoose model with the request fields.
    const products = new ContactPeopleProjectCategorySchema({ ...req.fields });

    // If 'photo' and 'pdf' files exist, read and store their data and content types.
    if (photo && pdf) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;

      products.pdf.data = fs.readFileSync(pdf.path);
      products.pdf.contentType = pdf.type;
    }

    // Save the new contact people and project data to the database.
    await products.save();

    // Send a success response with the saved contact people and project details.
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
      message: "Error in createContactPeopleController!!!",
      error,
    });
  }
};
