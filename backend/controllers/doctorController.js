import Doctor from '../models/Doctor.js';

// GET doctor profile
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// UPDATE doctor profile
export const updateDoctorProfile = async (req, res) => {
  const { speciality, experience, summary, college, fees } = req.body;
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    doctor.speciality = speciality || doctor.speciality;
    doctor.experience = experience || doctor.experience;
    doctor.summary = summary || doctor.summary;
    doctor.college = college || doctor.college;
    doctor.fees = fees || doctor.fees;

    await doctor.save();
    res.json({ msg: 'Profile updated', doctor });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile', error: err.message });
  }
};

// GET earnings
export const getEarnings = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    res.json({ earning: doctor.earning });
  } catch (err) {
    res.status(500).json({ msg: 'Error getting earnings', error: err.message });
  }
};
