import express from 'express';
import {
  getUser,
  getuserFriends,
  addRemoveFriend
} from '../Controllers/Users.js';
import { verifyToken } from '../Middleware/Auth.js'

const router = express.Router();

// Read routes
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getuserFriends)

// patch route
router.patch(':id/:friend', verifyToken, addRemoveFriend);

export default router