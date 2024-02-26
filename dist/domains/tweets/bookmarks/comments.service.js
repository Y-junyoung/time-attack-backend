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
const client_prisma_1 = __importDefault(require("../../../prisma/client.prisma"));
const createComment = (createCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, tweetId, content } = createCommentData;
    console.log();
    const comment = yield client_prisma_1.default.comment.create({
        data: {
            content,
            author: { connect: { userId: authorId } },
            tweet: { connect: { id: tweetId } },
        },
    });
    return comment;
});
const updateComment = (updateCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, authorId, commentId, content } = updateCommentData;
    const updatedComment = yield client_prisma_1.default.comment.update({
        where: { id: commentId, authorId, tweetId },
        data: { content },
    });
    return updatedComment;
});
const deleteComment = (deleteCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, commentId, authorId } = deleteCommentData;
    const deletedComment = yield client_prisma_1.default.comment.delete({
        where: { id: commentId, tweetId, authorId },
    });
    return deletedComment;
});
const commentsService = {
    createComment,
    updateComment,
    deleteComment,
};
exports.default = commentsService;
//# sourceMappingURL=comments.service.js.map