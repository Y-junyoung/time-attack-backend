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
const accounts_service_1 = __importDefault(require("./accounts.service"));
const accountsController = (0, express_1.Router)();
accountsController.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, profile: { nickname, description }, } = req.body;
        const user = yield accounts_service_1.default.signUp({
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
accountsController.post("/log-in", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const accessToken = yield accounts_service_1.default.logIn({ email, password });
        res.json({ accessToken });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = accountsController;
//# sourceMappingURL=accounts.controller.js.map