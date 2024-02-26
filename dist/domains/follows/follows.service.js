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
const followUser = (followUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const { followingId, userId } = followUserData;
    // 팔로잉 할 Id를 가져와서 이메일 추출
    const followingUser = yield client_prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!followingUser)
        throw new Error("유저 정보를 불러올 수 없습니다.");
    const followerId = followingUser.email;
    // 내가 팔로잉 --> 팔로잉 증가
    // 상대방에게는 팔로워 증가
    const following = yield client_prisma_1.default.follows.create({
        data: { followerId, followingId },
    });
    return following;
});
const unFollowUser = (unFollowUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const { followingId, userId } = unFollowUserData;
    // 언팔로잉 할 Id를 가져와서 이메일 추출
    const unFollowingUser = yield client_prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!unFollowingUser)
        throw new Error("유저 정보를 불러올 수 없습니다.");
    const followerId = unFollowingUser.email;
    const unFollowing = yield client_prisma_1.default.follows.delete({
        where: { followerId_followingId: { followerId, followingId } },
    });
    return unFollowing;
});
const deleteFollower = (deleteFollowerData) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, userId } = deleteFollowerData;
    const deletedFollowerUser = yield client_prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!deletedFollowerUser)
        throw new Error("유저 정보를 불러올 수 없습니다.");
    const followingId = deletedFollowerUser.email;
    const deletedFollower = yield client_prisma_1.default.follows.delete({
        where: { followerId_followingId: { followingId, followerId } },
    });
    return deletedFollower;
});
const followsService = { followUser, unFollowUser, deleteFollower };
exports.default = followsService;
//# sourceMappingURL=follows.service.js.map