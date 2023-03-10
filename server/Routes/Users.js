import express from 'express';
import {
  getUser,
  getAll,
  updateSocial,
  updateNetwork,
  getUserFriends,
  addRemoveFriend
} from '../Controllers/Users.js';
import { verifyToken } from '../Middleware/Auth.js'

const router = express.Router();

// Read routes
router.get('/:id', verifyToken, getUser);
router.get('/', verifyToken, getAll);
router.get('/:id/friends', verifyToken, getUserFriends)

// patch route
router.patch('/:id/social', verifyToken, updateSocial);
router.patch('/:id/network', verifyToken, updateNetwork);
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router