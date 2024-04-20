"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const manager_1 = require("../database/manager");
const router = (0, express_1.Router)();
router.post("/login", validator_1.validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // get user from database
    const user = yield (0, manager_1.getUserByEmail)(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    // compare password
    const isValidPassword = bcrypt_1.default.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    // create jwt token
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        timestamp: new Date().getTime(),
    }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    });
    res.json({ token });
}));
router.post("/register", validator_1.validateSignUp, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, image } = req.body;
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    // save user to database
    const newUser = yield (0, manager_1.registerNewUser)({
        name,
        email,
        password: hashedPassword,
        image,
    });
    if (!newUser) {
        return res.status(400).json({ message: "Email already taken" });
    }
    //   create jwt token
    const token = jsonwebtoken_1.default.sign({
        id: newUser.id,
        timestamp: new Date().getTime(),
    }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    });
    res.json({ token });
}));
router.put("/update", validator_1.validateUpdateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = router;
