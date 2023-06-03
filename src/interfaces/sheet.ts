import { IFormBag } from "./form";
import { IPlace } from "./place";
import { ICurator } from "./people";
import { IErrorCompare, IErrorLog } from "./errors";

export interface ISheet {
  curator: ICurator;
  modality: string;
  bag: {
    iva: number;
    height: number;
    width: number;
    length: number;
    weight: number;
  };
  place_obj: {
    id: string;
    client: string;
    mall: string;
    abbr: string;
    name: string;
    is_active: true;
  };
  workbook: string;
  errors: IErrorLog[];
}

export interface ISheetRequest {
  spreadsheet: Blob | null;
  curator_id: number;
  modality: string;
  bag_patterns: IFormBag;
  place: IPlace;
}

export interface ICompareSheets {
  control_spreadsheet: Blob | null;
  curator_spreadsheet: Blob | null;
  curator_id: number;
  place: string;
}

export interface ICompareSheetsResponse {
  place_obj: IPlace;
  curator: ICurator;

  errors: {
    sku: IErrorCompare[];
    prod: IErrorCompare[];
    espt: IErrorCompare[];
  };
}

export interface ISheerAdjustment extends ISheet {
  repeated: Array<IRepitedSku[]>;
}

export interface IRepitedSku {
  brand: string;
  category_code: string;
  created_at: string;
  ean: string;
  gender?: string;
  height?: number;
  id?: string;
  is_avaliable?: string;
  is_correct?: boolean;
  iva?: number;
  length?: number;
  price?: number;
  product_code: string;
  product_description?: string;
  product_name: string;
  secundary_price?: number;
  seller_name?: string;
  sku_code: string;
  sku_name?: string;
  supply?: number;
  tqm?: string;
  updated_at: string;
  weight?: number;
  width?: number;
  curator?: string;
  client?: string;
  mall?: string;
  abbr?: string;
  place?: string;
}
