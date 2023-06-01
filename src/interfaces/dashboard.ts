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
