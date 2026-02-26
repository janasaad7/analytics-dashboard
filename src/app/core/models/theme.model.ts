import {TThemeName} from './theme-name.type';

export interface ITheme {
  name: TThemeName;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  gridColor: string;
  cardBackground: string;
  chartColors: string[];
}
