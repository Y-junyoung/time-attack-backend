import { CreateCommentData, DeleteCommentData, UpdateCommentData } from "./comments.type";
declare const commentsService: {
    createComment: (createCommentData: CreateCommentData) => Promise<{
        id: number;
        authorId: string;
        tweetId: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateComment: (updateCommentData: UpdateCommentData) => Promise<{
        id: number;
        authorId: string;
        tweetId: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment: (deleteCommentData: DeleteCommentData) => Promise<{
        id: number;
        authorId: string;
        tweetId: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
export default commentsService;
//# sourceMappingURL=comments.service.d.ts.map