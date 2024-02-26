"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!exports.JWT_SECRET_KEY)
    throw new Error("No JWT_SECRET_KEY");
//# sourceMappingURL=env.config.js.map