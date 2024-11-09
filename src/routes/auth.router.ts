import { Router } from 'express';
import { login, register, logout, adminLogin, adminLogout, adminRegister } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/admin-login', adminLogin);
router.post('/admin-logout', adminLogout);
router.post('/admin-register', adminRegister);

export default router;