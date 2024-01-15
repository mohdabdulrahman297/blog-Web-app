import express from 'express';
import upload from '../middleware/multer.js';
import updatedPost from '../controllers/updatePost.js';

const router = express.Router();

router.put('/', upload, updatedPost);

export default router;