import { TRole } from './role.type';
import {TTrend} from './trend.type';

export interface IStat {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: TTrend;
  icon: string;
  currency?: string;
  suffix?: string;
  requiredRoles: TRole[];
  visible: boolean;
}
