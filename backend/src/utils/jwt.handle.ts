import jwt from "jsonwebtoken";

type TokenPayload = {
  id: string;
  email: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (payload: TokenPayload): string => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET no definido");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET no definido");
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};