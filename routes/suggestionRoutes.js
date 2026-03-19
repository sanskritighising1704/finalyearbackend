import express from 'express';
import { getAISuggestions } from '../controllers/suggestionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getAISuggestions);

export default router;