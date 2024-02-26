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
const createBookmark = (tweetId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookmark = yield client_prisma_1.default.bookmark.create({
        data: { tweetId, userId },
    });
    return bookmark;
});
const deleteBookmark = (tweetId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBookmark = yield client_prisma_1.default.bookmark.delete({
        where: { userId_tweetId: { tweetId, userId } },
    });
    return deletedBookmark;
});
const getBookmarks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const Bookmarks = yield client_prisma_1.default.bookmark.findMany({
        where: { userId },
        select: { tweet: true },
    });
    return Bookmarks;
});
const bookmarksService = {
    createBookmark,
    deleteBookmark,
    getBookmarks,
};
exports.default = bookmarksService;
//# sourceMappingURL=bookmarks.service.js.map