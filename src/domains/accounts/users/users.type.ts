export type SignUpData = {
  email: string;
  password: string;
  profile: {
    nickname: string;
    description: string;
  };
};

export type LogInData = {
  email: string;
  password: string;
};
