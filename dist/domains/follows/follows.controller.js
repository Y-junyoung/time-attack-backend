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
const userOnly_guard_1 = __importDefault(require("../../guards/userOnly.guard"));
const follows_service_1 = __importDefault(require("./follows.service"));
const followsController = (0, express_1.Router)();
followsController.post("/followings/:userId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const followingId = req.user.email;
        const followUserData = {
            followingId,
            userId,
        };
        const following = yield follows_service_1.default.followUser(followUserData);
        res.json(following);
    }
    catch (e) {
        next(e);
    }
}));
followsController.delete("/followings/:userId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const followingId = req.user.email;
        const unFollowUserData = {
            followingId,
            userId,
        };
        const unFollowing = yield follows_service_1.default.unFollowUser(unFollowUserData);
        res.json(unFollowing);
    }
    catch (e) {
        next(e);
    }
}));
followsController.delete("/followers/:userId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followerId = req.user.email;
        const userId = Number(req.params.userId);
        const deleteFollowerData = {
            userId,
            followerId,
        };
        const deleteFollower = yield follows_service_1.default.deleteFollower(deleteFollowerData);
        res.json(deleteFollower);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = followsController;
//# sourceMappingURL=follows.controller.js.map