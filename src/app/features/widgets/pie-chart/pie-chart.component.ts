import {Component, computed, inject, input} from '@angular/core';
import {ThemeService} from '../../../core/services/theme.service';
import {ChartConfiguration, ChartData} from 'chart.js';
import {WidgetWrapperComponent} from '../widget-wrapper/widget-wrapper.component';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [
    WidgetWrapperComponent,
    BaseChartDirective
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  #themeService = inject(ThemeService);

  title = input.required<string>();
  chartData = input.required<ChartData<'pie'>>();

  chartOptions = computed<ChartConfiguration<'pie'>['options']>(() => {
    const theme = this.#themeService.currentTheme();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: theme.textColor,
            font: { size: 12 },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: theme.cardBackground,
          titleColor: theme.textColor,
          bodyColor: theme.textColor,
          borderColor: theme.primaryColor,
          borderWidth: 1,
          callbacks: {
            label: (ctx) => {
              const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              const value = (ctx.parsed / 1000).toFixed(0);
              return ` $${value}k (${pct}%)`;
            },
          },
        },
      },
    };
  });
}
