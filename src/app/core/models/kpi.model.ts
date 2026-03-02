import {TRole} from './role.type';
import {TTrend} from './trend.type';

export interface IKpi {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: TTrend;
  change: number;
  status: 'success' | 'warning' | 'danger';
  description: string;
  requiredRoles: TRole[];
  visible: boolean;
}
