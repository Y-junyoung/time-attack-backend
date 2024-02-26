import { UpdateProfileData } from "./userProfile.type";
declare const userProfileService: {
    updateProfile: (updateProfileData: UpdateProfileData) => Promise<{
        userId: string;
        nickname: string;
        description: string;
    }>;
    getProfile: (userId: number) => Promise<{
        nickname: string;
        description: string;
        writtenTweets: {
            id: number;
            authorId: string;
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        followers: {
            followerId: string;
            followingId: string;
        }[];
        followings: {
            followerId: string;
            followingId: string;
        }[];
    } | null>;
    getFollowings: (userId: number) => Promise<({
        followings: {
            following: {
                nickname: string;
                description: string;
            };
        }[];
    } & {
        userId: string;
        nickname: string;
        description: string;
    }) | null>;
    getFollowers: (userId: number) => Promise<({
        followers: {
            follower: {
                nickname: string;
                description: string;
            };
        }[];
    } & {
        userId: string;
        nickname: string;
        description: string;
    }) | null>;
};
export default userProfileService;
//# sourceMappingURL=userProfile.service.d.ts.map