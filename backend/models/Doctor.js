import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notifications: [{ type: String }],
  earning: { type: Number, default: 0 },
  speciality: String,
  experience: String,
  summary: String,
  college: String,
  fees: { type: Number, default: 0 }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
