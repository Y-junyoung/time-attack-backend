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
const users_service_1 = __importDefault(require("./users.service"));
const userProfileController = (0, express_1.Router)();
userProfileController.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, profile: { nickname, description }, } = req.body;
        const user = yield users_service_1.default.signUp({
            email,
            password,
            profile: { nickname, description },
        });
        res.json(user);
    }
    catch (e) {
        next(e);
    }
}));
userProfileController.post("/log-in", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const accessToken = yield users_service_1.default.logIn({ email, password });
        res.json({ accessToken });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = userProfileController;
//# sourceMappingURL=users.controller.js.map