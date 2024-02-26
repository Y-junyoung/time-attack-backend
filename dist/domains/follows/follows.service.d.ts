import { DeleteFollowerData, FollowUserData, UnFollowUserData } from "./follows.type";
declare const followsService: {
    followUser: (followUserData: FollowUserData) => Promise<{
        followerId: string;
        followingId: string;
    }>;
    unFollowUser: (unFollowUserData: UnFollowUserData) => Promise<{
        followerId: string;
        followingId: string;
    }>;
    deleteFollower: (deleteFollowerData: DeleteFollowerData) => Promise<{
        followerId: string;
        followingId: string;
    }>;
};
export default followsService;
//# sourceMappingURL=follows.service.d.ts.map