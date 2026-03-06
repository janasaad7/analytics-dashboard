import {Component, computed, inject} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';
import {SalesService} from '../../../core/services/sales.service';
import {ThemeService} from '../../../core/services/theme.service';
import {WidgetWrapperComponent} from '../widget-wrapper/widget-wrapper.component';

@Component({
  selector: 'app-line-chart',
  imports: [
    BaseChartDirective,
    WidgetWrapperComponent
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
  #themeService = inject(ThemeService);
  #salesService = inject(SalesService);

  chartData = this.#salesService.lineChartData;

  chartOptions = computed<ChartConfiguration<'line'>['options']>(() => {
    const theme = this.#themeService.currentTheme();
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: theme.textColor,
            font: { size: 12, style: 'italic' },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          backgroundColor: theme.cardBackground,
          titleColor: theme.textColor,
          bodyColor: theme.textColor,
          borderColor: theme.primaryColor,
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          ticks: { color: theme.textColor },
          grid: { color: theme.gridColor },
          border: { display: false },
        },
        y: {
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
