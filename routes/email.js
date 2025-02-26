import { Router } from 'express';
const router = Router();
import { saveEmail } from '../controllers/email.js';

router.route('/').post(saveEmail)

export default router;
