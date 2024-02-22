export interface UserInfoI {
  userName: string;
  role: string;
}

export interface UserInfoApiResponseI {
  data: DataI;
  status: number;
}

interface DataI {
  user: UserInfoI;
  token: string;
}

export interface UserLogoutApiResponseI {
    data: any;
    status: number;
}
