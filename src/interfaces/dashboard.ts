export interface IhomeDashboard {
  total_skus: number;
  total_errors: number;
  groups: IGroups[];
}

export interface IGroups {
  name: string;
  group_errors: number;
  percentage: number;
}

export interface ICuratorErrorsComponent {
  percentage: number;
  curatorName?: string;
  errors: number;
}

export interface IShoppingDash {
  mallName: string;
  percentage: number;
  total_errors: number;
  owned_errors: number;
  group: INameValue[];
}

export interface INameValue {
  name: string;
  value: number;
}
