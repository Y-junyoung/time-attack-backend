declare const bookmarksService: {
    createBookmark: (tweetId: number, userId: string) => Promise<{
        id: number;
        userId: string;
        tweetId: number;
        createdAt: Date;
    }>;
    deleteBookmark: (tweetId: number, userId: string) => Promise<{
        id: number;
        userId: string;
        tweetId: number;
        createdAt: Date;
    }>;
    getBookmarks: (userId: string) => Promise<{
        tweet: {
            id: number;
            authorId: string;
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }[]>;
};
export default bookmarksService;
//# sourceMappingURL=bookmarks.service.d.ts.map