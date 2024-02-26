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
const userOnly_guard_1 = __importDefault(require("../../../guards/userOnly.guard"));
const bookmarks_service_1 = __importDefault(require("./bookmarks.service"));
const bookmarksController = (0, express_1.Router)();
bookmarksController.put("/tweets/:tweetId/bookmarks", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const userId = req.user.email;
        const bookmark = yield bookmarks_service_1.default.createBookmark(tweetId, userId);
        res.json(bookmark);
    }
    catch (e) {
        next(e);
    }
}));
bookmarksController.delete("/tweets/:tweetId/bookmarks", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const userId = req.user.email;
        const deletedBookmark = yield bookmarks_service_1.default.createBookmark(tweetId, userId);
        res.json(deletedBookmark);
    }
    catch (e) {
        next(e);
    }
}));
bookmarksController.get("/bookmarks", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.email;
        const bookmarks = yield bookmarks_service_1.default.getBookmarks(userId);
        res.json(bookmarks);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = bookmarksController;
//# sourceMappingURL=bookmarks.controller.js.map