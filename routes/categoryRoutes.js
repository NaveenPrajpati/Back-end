// Importing the 'express' library to set up our API server.
import express from "express";

// Importing the 'express-formidable' middleware for parsing form data.
import formidable from "express-formidable";

// Importing the controllers for creating categories and subcategories.
import {
  addNewProjectController,
  getAllProjectsController,
} from "../controller/categroyController.js";
import {
  createContactPeopleController,
  deleteContactPeopleController,
  fetchContactPeopleController,
  updateContactPeopleController,
} from "../controller/createContactPeopleController.js";
import { uploadResumeController } from "../controller/uploadResumeController.js";
import { uploadPaper } from "../controller/uploadPaperController.js";
// Create an instance of an Express Router to define our API routes.
const router = express.Router();

router.get("/projects", getAllProjectsController);
// Define a route to handle the creation of a new project category.
router.post("/create-new-project", formidable(), addNewProjectController);

// Define a route to fetch all projects. Customize the route path as needed.

// Define a route to handle contacting people for a project and using 'express-formidable' middleware
// to parse the form data from the request.
router.post(
  "/create-contact-people",
  formidable(),
  createContactPeopleController
);

// Fetch all contact people and projects
router.get("/contact-people", fetchContactPeopleController);

// Update a contact person or project by ID
router.put("/contact-people/:id", updateContactPeopleController);

// Delete a contact person or project by ID
router.delete("/contact-people/:id", deleteContactPeopleController);

router.post("/upload-resume", formidable(), uploadResumeController);

router.post("/upload-paper", formidable(), uploadPaper);
// Export the configured router for use in other parts of the application.
export default router;
