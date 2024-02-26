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
const updateProfile = (updateProfileData) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, description, userId } = updateProfileData;
    const updatedProfile = yield client_prisma_1.default.userProfile.update({
        where: { userId },
        data: { nickname, description },
    });
    return updatedProfile;
});
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error("유저 프로필 정보를 불러올 수 없습니다.");
    const email = user.email;
    const userProfile = yield client_prisma_1.default.userProfile.findUnique({
        where: { userId: email },
        select: {
            nickname: true,
            description: true,
            writtenTweets: { orderBy: { createdAt: "desc" } },
            followers: true,
            followings: true,
        },
    });
    return userProfile;
});
const getFollowings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error("유저 프로필 정보를 불러올 수 없습니다.");
    const email = user.email;
    const userProfile = yield client_prisma_1.default.userProfile.findUnique({
        where: { userId: email },
        include: {
            followings: {
                select: {
                    following: { select: { nickname: true, description: true } },
                },
            },
        },
    });
    return userProfile;
});
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error("유저 프로필 정보를 불러올 수 없습니다.");
    const email = user.email;
    const userProfile = yield client_prisma_1.default.userProfile.findUnique({
        where: { userId: email },
        include: {
            followers: {
                select: {
                    follower: { select: { nickname: true, description: true } },
                },
            },
        },
    });
    return userProfile;
});
const userProfileService = {
    updateProfile,
    getProfile,
    getFollowings,
    getFollowers,
};
exports.default = userProfileService;
//# sourceMappingURL=userProfile.service.js.map