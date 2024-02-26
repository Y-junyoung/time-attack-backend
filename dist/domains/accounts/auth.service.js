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
const env_config_1 = require("../../config/env.config");
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
const signUp = (signUpData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = signUpData;
    if (email.length < 8)
        throw new Error("8자 이상 입력하세요.");
    try {
        // 이메일(id) 중복 확인
        const overlappedEmail = yield client_prisma_1.default.user.findUnique({
            where: { email },
        });
        if (overlappedEmail !== null)
            throw new Error("email이 중복입니다.");
        const encryptedPassword = yield (0, bcrypt_1.hash)(password, 12);
        const user = yield client_prisma_1.default.user.create({
            data: { email, encryptedPassword },
        });
        const accessToken = generateAccessToken(user);
        return accessToken;
    }
    catch (e) {
        throw e;
    }
});
const logIn = () => { };
const generateAccessToken = (user) => {
    const { email } = user;
    const accessToken = jsonwebtoken_1.default.sign({ email }, env_config_1.JWT_SECRET_KEY, {
        subject: user.email,
        expiresIn: "2h",
    });
    return accessToken;
};
const authService = {
    signUp,
    logIn,
};
exports.default = authService;
//# sourceMappingURL=auth.service.js.map