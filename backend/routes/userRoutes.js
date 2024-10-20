import express from 'express';
import { getUsers, getUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/profile').get(protect, getUserProfile);

export default router;
