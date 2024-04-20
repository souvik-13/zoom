import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  image: z.string().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInSchema = z.infer<typeof signInSchema>;

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  image: z.string().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};

const validateSignIn = (req: Request, res: Response, next: NextFunction) => {
  const result = signInSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};

const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};

export { validateSignUp, validateSignIn, validateUpdateUser };
