"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateSignIn = exports.validateSignUp = void 0;
const zod_1 = require("zod");
const signUpSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    image: zod_1.z.string().optional(),
});
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    image: zod_1.z.string().optional(),
});
const validateSignUp = (req, res, next) => {
    const result = signUpSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error);
    }
    next();
};
exports.validateSignUp = validateSignUp;
const validateSignIn = (req, res, next) => {
    const result = signInSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error);
    }
    next();
};
exports.validateSignIn = validateSignIn;
const validateUpdateUser = (req, res, next) => {
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error);
    }
    next();
};
exports.validateUpdateUser = validateUpdateUser;
