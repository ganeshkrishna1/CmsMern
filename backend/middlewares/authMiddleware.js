import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin Middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

// Organizer Middleware
export const organizer = (req, res, next) => {
  if (req.user && req.user.role === 'organizer') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as organizer');
  }
};
export const organizerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.role === 'Organizer')) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an organizer or admin' });
  }
};

export const attendee = (req, res, next) => {
  if (req.user && req.user.role === 'Attendee') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an attendee' });
  }
};

