import { IUser, ICurator } from "./people";

export interface IErrosTypes {
  id: number;
  group: string;
  title: string;
  description: string;
  severity: number;
  collector: string;
}

export interface IErrorLog {
  error_type?: IErrosTypes;
  coor?: string;
  sheet?: string;
}

export interface IErroLogBody {
  curator_id: number | undefined;
  error_type_id: number;
  sku_error: string;
}

export interface IErroLogResponse {
  id: string;
  user: IUser;
  curator: ICurator;
  error_type: IErrosTypes;
  sku_error: string;
  created_at: string;
}
