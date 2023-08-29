export interface IPlace {
  id: string;
  client: string;
  mall: string;
  abbr: string;
  name: string;
  is_active: boolean;
}

export interface IPlaceRequest {
  client: string;
  mall: string;
  abbr: string;
  name: string;
}

export interface IMallDash {
  mallName: string;
  sellerName: string;
  percentage: number;
  total_errors: number;
  owned_errors: number;
  group: IMallDashGroup[];
}

export interface IMallDashGroup {
  name: string;
  value: number;
}
