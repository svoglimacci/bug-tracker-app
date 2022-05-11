export type LoginAuthDTO = {
  username: string;
  password: string;
};

export type LogoutAuthDTO = {
  id: number;
  userId: number;
  token: string;
};
