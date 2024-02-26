export type FollowUserData = {
  userId: number;
  followingId: string;
};

export type UnFollowUserData = {
  userId: number;
  followingId: string;
};

export type DeleteFollowerData = {
  userId: number;
  followerId: string;
};
