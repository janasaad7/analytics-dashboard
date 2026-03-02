import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { TThemeName } from '../models/theme-name.type';
import { ITheme } from '../models/theme.model';
import themes from '../../../../public/assets/data/themes.json';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #document = inject(DOCUMENT);
  #themes = themes as Record<TThemeName, ITheme>;

  currentTheme = signal<ITheme>(this.#themes['light']);

  constructor() {
    effect(() => {
      this.#applyTheme(this.currentTheme());
    });
  }

  setTheme(name: TThemeName): void {
    this.currentTheme.set(this.#themes[name]);
  }

  getTheme(name: TThemeName): ITheme {
    return this.#themes[name];
  }

  #applyTheme(theme: ITheme): void {
    const root = this.#document.documentElement;
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--grid-color', theme.gridColor);
    root.style.setProperty('--card-background', theme.cardBackground);
    root.style.setProperty('--success-color', theme.successColor);
    root.style.setProperty('--warning-color', theme.warningColor);
    root.style.setProperty('--danger-color', theme.dangerColor);
    theme.chartColors.forEach((color, i) => {
      root.style.setProperty(`--chart-color-${i + 1}`, color);
    });
  }
}
