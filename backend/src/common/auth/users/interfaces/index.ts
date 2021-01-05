export interface UserBase {
  email: string;
  nickname?: string;
  token?: string;
}

interface UserWithCredential extends UserBase {
  password: string;
}

export interface DbUser extends UserWithCredential {
  _id: string;
}

export interface UserData extends UserBase {
  id: string;
}
