import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const NotepadSchema = new Schema({
  name: String,
  notes: [NoteSchema],
  padId: Number,
  passcode: Number,
});

let Notepad;
if (mongoose.models.Notepad) {
  Notepad = mongoose.model("Notepad");
} else {
  Notepad = mongoose.model("Notepad", NotepadSchema);
}

export default Notepad;
