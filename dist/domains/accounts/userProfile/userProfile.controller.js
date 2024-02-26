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
const userOnly_guard_1 = __importDefault(require("./../../../guards/userOnly.guard"));
const userProfile_service_1 = __importDefault(require("./userProfile.service"));
const userProfileController = (0, express_1.Router)();
userProfileController.put("/", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname, description } = req.body;
        const userId = req.user.email;
        const user = yield userProfile_service_1.default.updateProfile({
            userId,
            nickname,
            description,
        });
        res.json(user);
    }
    catch (e) {
        next(e);
    }
}));
userProfileController.get("/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userProfile = yield userProfile_service_1.default.getProfile(userId);
        res.json(userProfile);
    }
    catch (e) {
        next(e);
    }
}));
userProfileController.get("/:userId/followings", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userFollowings = yield userProfile_service_1.default.getFollowings(userId);
        res.json(userFollowings);
    }
    catch (e) {
        next(e);
    }
}));
userProfileController.get("/:userId/followers", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userFollowers = yield userProfile_service_1.default.getFollowers(userId);
        res.json(userFollowers);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = userProfileController;
//# sourceMappingURL=userProfile.controller.js.map