"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_controller_1 = __importDefault(require("./accounts/accounts.controller"));
const bookmarks_controller_1 = __importDefault(require("./bookmarks/bookmarks.controller"));
const follows_controller_1 = __importDefault(require("./follows/follows.controller"));
const tweets_controller_1 = __importDefault(require("./tweets/tweets.controller"));
const controllers = (0, express_1.Router)();
controllers.get("/health-check", (_, res) => {
    console.log("health-check");
    res.json("health-check");
});
controllers.use("/accounts", accounts_controller_1.default);
controllers.use("/tweets", tweets_controller_1.default);
controllers.use(follows_controller_1.default);
controllers.use(bookmarks_controller_1.default);
exports.default = controllers;
//# sourceMappingURL=index.domain.js.map