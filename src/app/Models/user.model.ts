export interface CurrentUser {
  username: string;
  accessToken: string;
}

export interface UserDetails {
  user: UserMoreInfo;
  token: string;
}

export interface UserMoreInfo {
  id?: string;
  email: string;
  username: string;
}
