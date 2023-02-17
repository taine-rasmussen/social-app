import { getFeedPosts, getUserPosts, likePost, commentPost } from '../Controllers/Posts.js';
import { verifyToken } from '../Middleware/Auth.js';
import express from 'express';

const router = express.Router();

// Read
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);

// Update
router.patch('/:id/like', verifyToken, likePost);
router.patch('/:id/comment', verifyToken, commentPost);

export default router;