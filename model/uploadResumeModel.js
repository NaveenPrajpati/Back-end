import mongoose from "mongoose";

const uploadResumeSchema = new mongoose.Schema(
  {
    resume: {
      data: Buffer,
      contentType: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resumes", uploadResumeSchema);
