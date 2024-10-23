import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../emailConfig.js';

// Get all users except admin (Admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } }); // Exclude admin users
  res.json(users);
});


// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// Temporarily store OTP
let currentOtp = '';

// Send OTP for password reset
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate 6-digit OTP
    currentOtp = crypto.randomInt(100000, 999999).toString();

    // Send OTP via email
    await transporter.sendMail({
      to: email,
      subject: 'OTP for password reset',
      text: `Your OTP for password reset is: ${currentOtp}`,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { otp } = req.body;

  if (otp === currentOtp) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = password;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
};


// Resend OTP (Optional)
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a new OTP
    currentOtp = crypto.randomInt(100000, 999999).toString();

    // Resend OTP via email
    await transporter.sendMail({
      to: email,
      subject: 'OTP for password reset',
      text: `Your new OTP for password reset is: ${currentOtp}`,
    });

    res.json({ message: 'New OTP sent successfully' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ message: 'Error resending OTP' });
  }
};