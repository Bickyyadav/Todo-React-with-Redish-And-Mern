import express from 'express'
import { login, logout, registry } from '../controllers/user.js';


const router = express.Router();

router.route("/register").post(registry)
router.route("/login").post(login)
router.route("/logout").get(logout)
export default router;
