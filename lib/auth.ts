import User from "@/models/User";
import { connectDB } from "./db";
import { hashPassword, comparePassword, createToken } from "./utils";

export async function signupUser(email: string, password: string) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed });

  const token = createToken(user._id.toString());
  return { token, user };
}

export async function loginUser(email: string, password: string) {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = createToken(user._id.toString());
  return { token, user };
}
