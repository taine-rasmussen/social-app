import { getFeedPosts, getUserPosts, likePost } from '../Controllers/Posts.js';
import { verifyToken } from '../Middleware/Auth.js';
import express from 'express';

const router = express.Router();

// Read
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);

// Update
router.patch('/:id/like', verifyToken, likePost);

export default router;
