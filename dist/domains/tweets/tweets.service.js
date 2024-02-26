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
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
const getTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const tweets = yield client_prisma_1.default.tweet.findMany({
        orderBy: { createdAt: "desc" },
        include: { comments: true },
    });
    return tweets;
});
const createTweet = (createTweetData) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, title, content } = createTweetData;
    const tweet = yield client_prisma_1.default.tweet.create({
        data: {
            title,
            content,
            author: { connect: { userId: authorId } },
        },
    });
    return tweet;
});
const updateTweet = (updateTweetData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, authorId, title, content } = updateTweetData;
    const updatedTweet = yield client_prisma_1.default.tweet.update({
        where: { id: tweetId, authorId },
        data: { title, content },
    });
    return updatedTweet;
});
const deleteTweet = (deleteTweetData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, authorId } = deleteTweetData;
    const deletedTweet = yield client_prisma_1.default.tweet.delete({
        where: { id: tweetId, authorId },
    });
    return deletedTweet;
});
const tweetsService = { createTweet, getTweets, updateTweet, deleteTweet };
exports.default = tweetsService;
//# sourceMappingURL=tweets.service.js.map