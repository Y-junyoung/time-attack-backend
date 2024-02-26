"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const index_domain_1 = __importDefault(require("./domains/index.domain"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
require("./prisma/client.prisma");
const app = (0, express_1.default)();
const PORT = 5050;
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
app.use(auth_middleware_1.default);
app.use(index_domain_1.default);
app.listen(PORT, () => {
    console.log(`서버가 구동되기 시작했습니다... port: ${PORT}`);
});
//# sourceMappingURL=app.js.map