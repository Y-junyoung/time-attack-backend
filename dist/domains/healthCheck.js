"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthCheck = (0, express_1.Router)();
healthCheck.get("/", () => {
    console.log("health-check");
    return "health-check";
});
exports.default = healthCheck;
//# sourceMappingURL=healthCheck.js.map