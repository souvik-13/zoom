import { Router } from "express";
import {
  validateSignIn,
  validateSignUp,
  validateUpdateUser,
} from "../middlewares/validator";
import Jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail, registerNewUser } from "../database/manager";

const router = Router();

router.post("/login", validateSignIn, async (req, res) => {
  const { email, password } = req.body;
  // get user from database
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // compare password
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // create jwt token
  const token = Jwt.sign(
    {
      id: user.id,
      timestamp: new Date().getTime(),
    },
    process.env.JWT_SECRET as Secret,
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });
  res.json({ token });
});

router.post("/register", validateSignUp, async (req, res) => {
  const { name, email, password, image } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // save user to database
  const newUser = await registerNewUser({
    name,
    email,
    password: hashedPassword,
    image,
  });

  if (!newUser) {
    return res.status(400).json({ message: "Email already taken" });
  }

  //   create jwt token
  const token = Jwt.sign(
    {
      id: newUser.id,
      timestamp: new Date().getTime(),
    },
    process.env.JWT_SECRET as Secret,
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });
  res.json({ token });
});

router.put("/update", validateUpdateUser, async (req, res) => {});

router.delete("/delete", async (req, res) => {});

export default router;
