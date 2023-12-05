import mongoose from "mongoose";
const schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, enum: ['ADMIN', 'USER', 'FACULTY', 'STUDENT'], default: 'USER'},
  salary: {type: Number, default: 0},
  married: {type: Boolean, default: false},
  dob: Date,
  doh: {type: Date, default: Date.now},
  firstName: String,
  lastName: String
},{collection: "users"});
export default schema;