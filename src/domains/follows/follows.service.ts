import prismaClient from "../../prisma/client.prisma";
import {
  DeleteFollowerData,
  FollowUserData,
  UnFollowUserData,
} from "./follows.type";

const followUser = async (followUserData: FollowUserData) => {
  const { followingId, userId } = followUserData;

  // 팔로잉 할 Id를 가져와서 이메일 추출
  const followingUser = await prismaClient.user.findUnique({
    where: { id: userId },
  });
  if (!followingUser) throw new Error("유저 정보를 불러올 수 없습니다.");

  const followerId = followingUser.email;
  // 내가 팔로잉 --> 팔로잉 증가
  // 상대방에게는 팔로워 증가
  const following = await prismaClient.follows.create({
    data: { followerId, followingId },
  });

  return following;
};

const unFollowUser = async (unFollowUserData: UnFollowUserData) => {
  const { followingId, userId } = unFollowUserData;

  // 언팔로잉 할 Id를 가져와서 이메일 추출
  const unFollowingUser = await prismaClient.user.findUnique({
    where: { id: userId },
  });
  if (!unFollowingUser) throw new Error("유저 정보를 불러올 수 없습니다.");

  const followerId = unFollowingUser.email;

  const unFollowing = await prismaClient.follows.delete({
    where: { followerId_followingId: { followerId, followingId } },
  });

  return unFollowing;
};

const deleteFollower = async (deleteFollowerData: DeleteFollowerData) => {
  const { followerId, userId } = deleteFollowerData;

  const deletedFollowerUser = await prismaClient.user.findUnique({
    where: { id: userId },
  });
  if (!deletedFollowerUser) throw new Error("유저 정보를 불러올 수 없습니다.");

  const followingId = deletedFollowerUser.email;

  const deletedFollower = await prismaClient.follows.delete({
    where: { followerId_followingId: { followingId, followerId } },
  });

  return deletedFollower;
};

const followsService = { followUser, unFollowUser, deleteFollower };

export default followsService;
