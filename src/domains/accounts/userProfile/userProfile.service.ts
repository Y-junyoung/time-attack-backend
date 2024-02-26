import prismaClient from "../../../prisma/client.prisma";
import { UpdateProfileData } from "./userProfile.type";

const updateProfile = async (updateProfileData: UpdateProfileData) => {
  const { nickname, description, userId } = updateProfileData;

  const updatedProfile = await prismaClient.userProfile.update({
    where: { userId },
    data: { nickname, description },
  });

  return updatedProfile;
};

const getProfile = async (userId: number) => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("유저 프로필 정보를 불러올 수 없습니다.");

  const email = user.email;

  const userProfile = await prismaClient.userProfile.findUnique({
    where: { userId: email },
    select: {
      nickname: true,
      description: true,
      writtenTweets: { orderBy: { createdAt: "desc" } },
      followers: true,
      followings: true,
    },
  });

  return userProfile;
};

const getFollowings = async (userId: number) => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("유저 프로필 정보를 불러올 수 없습니다.");

  const email = user.email;

  const userProfile = await prismaClient.userProfile.findUnique({
    where: { userId: email },
    include: {
      followings: {
        select: {
          following: { select: { nickname: true, description: true } },
        },
      },
    },
  });

  return userProfile;
};

const getFollowers = async (userId: number) => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("유저 프로필 정보를 불러올 수 없습니다.");

  const email = user.email;

  const userProfile = await prismaClient.userProfile.findUnique({
    where: { userId: email },
    include: {
      followers: {
        select: {
          follower: { select: { nickname: true, description: true } },
        },
      },
    },
  });

  return userProfile;
};

const userProfileService = {
  updateProfile,
  getProfile,
  getFollowings,
  getFollowers,
};

export default userProfileService;
