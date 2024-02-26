import { CreateTweetData, DeleteTweetData, UpdateTweetData } from "./tweets.type";
declare const tweetsService: {
    createTweet: (createTweetData: CreateTweetData) => Promise<{
        id: number;
        authorId: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTweets: () => Promise<({
        comments: {
            id: number;
            authorId: string;
            tweetId: number;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        authorId: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateTweet: (updateTweetData: UpdateTweetData) => Promise<{
        id: number;
        authorId: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteTweet: (deleteTweetData: DeleteTweetData) => Promise<{
        id: number;
        authorId: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
export default tweetsService;
//# sourceMappingURL=tweets.service.d.ts.map