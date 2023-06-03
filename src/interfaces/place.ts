export interface IPlace {
  id?: string;
  client?: string;
  mall?: string;
  abbr?: string;
  name?: string;
  is_active?: boolean;
}

export interface IPlaceRequest {
  client: string;
  mall: string;
  abbr: string;
  name: string;
}
