import mongoose from "mongoose";

const ContactPeopleProjectCategorySchema = new mongoose.Schema(
  {
    pCategory: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
    responsibility: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    pdf: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ContactPeopleForProject",
  ContactPeopleProjectCategorySchema
);
