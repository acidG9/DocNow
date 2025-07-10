import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notifications: [{ type: String }]
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
