import mongoose from "mongoose";

const addNewProjectCategorySchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      ref: "Category",
      required: true,
    },
    topic: {
      type: String,
      ref: "Topic",
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

export default mongoose.model("AddNewProject", addNewProjectCategorySchema);
