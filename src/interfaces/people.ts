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
  password?: string;
  role?: {
    id: number;
    title: string;
    description: string;
  };
  role_id?: number;
  is_active?: boolean;
}

export interface ICurator {
  id?: number;
  name?: string;
  level?: number;
  is_active: boolean;
  percentage: number;
  total_errors: number;
  owned_errors: number;
  error_points: number;
  groups?: {};
}

export interface IUserRelatory extends IUserDetail {
  relatory?: {
    percentage: number;
    total_errors: number;
    owned_errors: number;
    old_relatory?: IOldRelatory[];
  };
}

export interface IOldRelatory {
  relatory_date?: string;
  percentage?: number;
  total_errors: number;
  owned_errors: number;
}

export interface IUserInFocus {
  percentage: number | undefined;
  name: string;
  total_errors: number | undefined;
  owned_errors: number | undefined;
  is_manager: boolean | undefined;
}
