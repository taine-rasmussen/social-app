import { getFeedPosts, getUserPosts, likePost } from '../Controllers/Post.js';
import { verifyToken } from '../Middleware/Auth.js';
import express from 'express';

const router = express.Router();

// Read
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getFeedPosts);

// Update
router.patch('/:id/like', verifyToken, likePost);

export default router;
