import mongoose from "mongoose";

const paperJournalSchema = new mongoose.Schema({
  topic: String,
  pdf: {
    data: Buffer,
    contentType: String,
  },
});

const PaperJournalModel = mongoose.model("PaperJournal", paperJournalSchema);

export default PaperJournalModel;
