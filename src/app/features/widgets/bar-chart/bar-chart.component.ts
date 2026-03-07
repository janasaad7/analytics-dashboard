import {Component, computed, inject, input} from '@angular/core';
import {ChartConfiguration, ChartData} from 'chart.js';
import {ThemeService} from '../../../core/services/theme.service';
import {WidgetWrapperComponent} from '../widget-wrapper/widget-wrapper.component';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [
    WidgetWrapperComponent,
    BaseChartDirective
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  #themeService = inject(ThemeService);

  title = input.required();
  chartData = input.required<ChartData<'bar'>>();

  chartOptions = computed<ChartConfiguration<'bar'>['options']>(() => {
    const theme = this.#themeService.currentTheme();
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: theme.cardBackground,
          titleColor: theme.textColor,
          bodyColor: theme.textColor,
          borderColor: theme.primaryColor,
          borderWidth: 1,
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          ticks: { color: theme.textColor },
          grid: { color: theme.gridColor },
          border: { display: false },
        },
        y: {
          position: 'left',
          ticks: {
            color: theme.textColor,
            callback: (value) => `$${(+value / 1000).toFixed(0)}k`,
          },
          grid: { color: theme.gridColor },
          border: { display: false },
        },
      },
    };
  });
}
