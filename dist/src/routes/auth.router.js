"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.login);
router.post('/register', auth_controller_1.register);
router.post('/logout', auth_controller_1.logout);
router.post('/admin-login', auth_controller_1.adminLogin);
router.post('/admin-logout', auth_controller_1.adminLogout);
router.post('/admin-register', auth_controller_1.adminRegister);
exports.default = router;
