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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../../config/env.config");
const client_prisma_1 = __importDefault(require("../../../prisma/client.prisma"));
const signUp = (signUpData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, profile: { nickname, description }, } = signUpData;
    if (password.length < 8)
        throw new Error("비밀번호가 너무 짧습니다!");
    const overlappedEmail = yield client_prisma_1.default.user.findUnique({
        where: { email },
    });
    if (overlappedEmail !== null)
        throw new Error("email이 중복입니다.");
    const encryptedPassword = yield (0, bcrypt_1.hash)(password, 12);
    const data = {
        email,
        encryptedPassword,
        profile: {
            create: {
                nickname,
                description,
            },
        },
    };
    const user = yield client_prisma_1.default.user.create({
        data,
        select: { email: true, profile: true },
    });
    return user;
});
const logIn = (logInData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = logInData;
    const user = yield client_prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new Error("잘못된 정보입니다.");
    const isCorrect = yield (0, bcrypt_1.compare)(password, user.encryptedPassword);
    if (!isCorrect)
        throw new Error("비밀번호가 틀렸습니다.");
    const accessToken = generateAccessToken(user);
    return accessToken;
});
const generateAccessToken = (user) => {
    const { email } = user;
    const accessToken = jsonwebtoken_1.default.sign({ email }, env_config_1.JWT_SECRET_KEY, {
        subject: user.email,
        expiresIn: "2d",
    });
    return accessToken;
};
const userProfileService = {
    signUp,
    logIn,
};
exports.default = userProfileService;
//# sourceMappingURL=users.service.js.map