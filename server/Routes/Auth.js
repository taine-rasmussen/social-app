import express from 'express';
import { Login } from '../Controllers/Login';

const router = express.Router();

router.post('/login', Login);

export default router