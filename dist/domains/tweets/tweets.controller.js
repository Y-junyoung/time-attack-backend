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
const comments_controller_1 = __importDefault(require("./comments/comments.controller"));
const tweets_service_1 = __importDefault(require("./tweets.service"));
const tweetsController = (0, express_1.Router)();
tweetsController.get("/", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield tweets_service_1.default.getTweets();
        res.json(tweets);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.post("/", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const authorId = req.user.email;
        const createTweetData = {
            title,
            content,
            authorId,
        };
        const tweet = yield tweets_service_1.default.createTweet(createTweetData);
        res.json(tweet);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.patch("/:tweetId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const { title, content } = req.body;
        const authorId = req.user.email;
        const updateTweetData = {
            tweetId,
            title,
            content,
            authorId,
        };
        const updatedTweet = yield tweets_service_1.default.updateTweet(updateTweetData);
        res.json(updatedTweet);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.delete("/:tweetId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = Number(req.params.tweetId);
        const authorId = req.user.email;
        const data = {
            tweetId,
            authorId,
        };
        const deletedTweet = yield tweets_service_1.default.deleteTweet(data);
        res.json(deletedTweet);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.use("/", comments_controller_1.default);
exports.default = tweetsController;
//# sourceMappingURL=tweets.controller.js.map