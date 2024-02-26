import prismaClient from "../../prisma/client.prisma";
import {
  CreateTweetData,
  DeleteTweetData,
  UpdateTweetData,
} from "./tweets.type";

const getTweets = async () => {
  const tweets = await prismaClient.tweet.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true },
  });

  return tweets;
};

const createTweet = async (createTweetData: CreateTweetData) => {
  const { authorId, title, content } = createTweetData;
  const tweet = await prismaClient.tweet.create({
    data: {
      title,
      content,
      author: { connect: { userId: authorId } },
    },
  });

  return tweet;
};

const updateTweet = async (updateTweetData: UpdateTweetData) => {
  const { tweetId, authorId, title, content } = updateTweetData;
  const updatedTweet = await prismaClient.tweet.update({
    where: { id: tweetId, authorId },
    data: { title, content },
  });

  return updatedTweet;
};

const deleteTweet = async (deleteTweetData: DeleteTweetData) => {
  const { tweetId, authorId } = deleteTweetData;
  const deletedTweet = await prismaClient.tweet.delete({
    where: { id: tweetId, authorId },
  });

  return deletedTweet;
};

const tweetsService = { createTweet, getTweets, updateTweet, deleteTweet };

export default tweetsService;
