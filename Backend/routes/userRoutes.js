import { register, login, logout } from '../Controllers/userControllers.js'
import express from "express";

//import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
