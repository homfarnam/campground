export class UserBase {
  readonly email: string;
  refreshToken?: string;
}

export class UserData extends UserBase {
  id: string;
  accessToken: string;
}
