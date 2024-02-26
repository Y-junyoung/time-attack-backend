import { CreateTweetData, DeleteTweetData, UpdateTweetData } from "./tweets.type";
declare const tweetsService: {
    createTweet: (createTweetData: CreateTweetData) => Promise<any>;
    getTweets: () => Promise<any>;
    updateTweet: (updateTweetData: UpdateTweetData) => Promise<any>;
    deleteTweet: (deleteTweetData: DeleteTweetData) => Promise<any>;
};
export default tweetsService;
//# sourceMappingURL=tweets.service.d.ts.map