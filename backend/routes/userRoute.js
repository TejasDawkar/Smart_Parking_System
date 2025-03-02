import express from 'express';
import {userRegistration, userPass} from '../controllers/userController/index.js';

const router = express.Router();

router.route('/register').post(userRegistration);
router.get('/pass', userPass);

export default router;