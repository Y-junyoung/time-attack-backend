import prismaClient from "../../prisma/client.prisma";

const addBookmark = async (tweetId: number, userId: string) => {
  const bookmark = await prismaClient.bookmark.create({
    data: { tweetId, userId },
  });

  return bookmark;
};

const deleteBookmark = async (tweetId: number, userId: string) => {
  const deletedBookmark = await prismaClient.bookmark.delete({
    where: { userId_tweetId: { tweetId, userId } },
  });

  return deletedBookmark;
};

const getBookmarks = async (userId: string) => {
  const Bookmarks = await prismaClient.bookmark.findMany({
    where: { userId },
    select: { tweet: true },
  });

  return Bookmarks;
};

const bookmarksService = {
  addBookmark,
  deleteBookmark,
  getBookmarks,
};

export default bookmarksService;
