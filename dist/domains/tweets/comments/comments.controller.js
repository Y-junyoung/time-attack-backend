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
const comments_service_1 = __importDefault(require("./comments.service"));
const commentsController = (0, express_1.Router)();
commentsController.post("/:tweetId/comments", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const authorId = req.user.email;
        const tweetId = Number(req.params.tweetId);
        const createCommentData = {
            tweetId,
            content,
            authorId,
        };
        const comment = yield comments_service_1.default.createComment(createCommentData);
        res.json(comment);
    }
    catch (e) {
        next(e);
    }
}));
commentsController.patch("/:tweetId/comments/:commentId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const commentId = Number(req.params.commentId);
        const { content } = req.body;
        const authorId = req.user.email;
        const updateCommentData = {
            tweetId,
            content,
            commentId,
            authorId,
        };
        const updatedComment = yield comments_service_1.default.updateComment(updateCommentData);
        res.json(updatedComment);
    }
    catch (e) {
        next(e);
    }
}));
commentsController.delete("/:tweetId/comments/:commentId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const commentId = Number(req.params.commentId);
        const authorId = req.user.email;
        const data = {
            commentId,
            tweetId,
            authorId,
        };
        const deletedComment = yield comments_service_1.default.deleteComment(data);
        res.json(deletedComment);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = commentsController;
//# sourceMappingURL=comments.controller.js.map