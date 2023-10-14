import mongoose from "mongoose";

const uploadResumeSchema = new mongoose.Schema(
  {
    resume: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resumes", uploadResumeSchema);
