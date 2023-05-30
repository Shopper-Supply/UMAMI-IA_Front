import { IErrosTypes } from "./errors";
import { ICurator } from "./people";
import { IPlace } from "./place";

export interface IFormEnvioError {
  curator: string;
  error_type: string;
  coor: string;
  sheet: string;
  client: string;
  abbr: string;
  mall: string;
  place: string;
}

export interface IFormBag {
  iva?: number;
  width?: number;
  height?: number;
  weight?: number;
  length?: number;
}

export interface IFormPlanilha {
  curator: number;
  client: string;
  abbr: string;
  mall: string;
  place: string;
}

export interface IConfirmAction {
  message: string;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormLogin {
  username?: string;
  email?: string;
  password: string;
}

export interface IFormCompareSheets {
  control_spreadsheet: FileList | null;
  curator_spreadsheet: FileList | null;
  curator: ICurator;
  client: string;
  abbr: string;
  mall: string;
  place: string;
}

export interface IFormRepitedSku {
  product_name: string;
  sku_code: string;
  brand: string;
  category_code: number;
  curator: string;
  client: string;
  mall: string;
  created_at: number;
  abbr: string;
  place: string;
  ean: number;
  product_code: number;
  updated_at: number;
}
