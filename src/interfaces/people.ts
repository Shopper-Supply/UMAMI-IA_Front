import { UUID } from "crypto";

export interface IUser {
  id?: UUID;
  username: string;
  name: string;
  email: string;
}

export interface IUserDetail extends IUser {
  date_joined?: string;
  updated_at?: string;
  role?: {
    id: number;
    title: string;
    description: string;
  };
}

export interface ICurator {
  id?: number;
  name?: string;
  level?: number;
  is_active?: boolean;
}
