import { Prisma, User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../config/env.config";
import prismaClient from "../../../prisma/client.prisma";
import { LogInData, SignUpData } from "./users.type";

const signUp = async (signUpData: SignUpData) => {
  const {
    email,
    password,
    profile: { nickname, description },
  } = signUpData;

  if (password.length < 8) throw new Error("비밀번호가 너무 짧습니다!");

  const overlappedEmail = await prismaClient.user.findUnique({
    where: { email },
  });
  if (overlappedEmail !== null) throw new Error("email이 중복입니다.");

  const encryptedPassword = await hash(password, 12);

  const data: Prisma.UserCreateInput = {
    email,
    encryptedPassword,
    profile: {
      create: {
        nickname,
        description,
      },
    },
  };

  const user = await prismaClient.user.create({
    data,
    select: { email: true, profile: true },
  });

  return user;
};

const logIn = async (logInData: LogInData) => {
  const { email, password } = logInData;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error("잘못된 정보입니다.");

  const isCorrect = await compare(password, user.encryptedPassword);
  if (!isCorrect) throw new Error("비밀번호가 틀렸습니다.");

  const accessToken = generateAccessToken(user);

  return accessToken;
};

const generateAccessToken = (user: User) => {
  const { email } = user;
  const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
    subject: user.email,
    expiresIn: "2d",
  });

  return accessToken;
};

const usersService = {
  signUp,
  logIn,
};

export default usersService;
