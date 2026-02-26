import { Injectable } from '@angular/core';
import {ChartOptions} from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartConfigService {
  private readonly baseOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    // interaction: {
    //   mode: 'index',
    //   intersect: false,
    // },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  getLineChartOptions(overrides?: Partial<ChartOptions<'line'>>): ChartOptions<'line'> {
    const lineChartDefaults: ChartOptions<'line'> = {
      ...this.baseOptions,
      // scales: {
      //   x: { border: { display: false } },
      //   y: { border: { display: false } },
      // },
      // elements: {
      //   line: { tension: 0.4 },
      //   point: { radius: 3, hoverRadius: 6 },
      // },
    };

    return { ...lineChartDefaults, ...overrides };
  }
}
