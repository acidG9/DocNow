import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

export const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const Model = role === 'doctor' ? Doctor : Patient;
    const user = await Model.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const Model = role === 'doctor' ? Doctor : Patient;
    const existing = await Model.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      username,
      password: hashedPassword,
      notifications: []
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const verifyAuth = (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
};
