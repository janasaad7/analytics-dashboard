import {computed, inject, Injectable} from '@angular/core';
import {DashboardFilterService} from './dashboard-filter.service';
import salesData from '../../../../public/assets/data/sales-data.json'
import {ChartDataset} from 'chart.js';
@Injectable({
  providedIn: 'root',
})
export class SalesService {
  filters = inject(DashboardFilterService);

  filteredDailySales = computed(() => {
    const range = this.filters.dateRange();
    const category = this.filters.category();
    const region = this.filters.region();

    if (range === 'year') return [];

    const days = range === 'week' ? 7 : 30;

    const lastNDays = salesData.dailySales.slice(-days);

    if (category === 'All' && region === 'All') return lastNDays;

    return lastNDays.map(day => ({
      ...day,
      amount: (() => {
        const match = salesData.dailySales.find(
          d => d.date === day.date &&
            (category === 'All' || d.category === category) &&
            (region === 'All' || d.region === region)
        );
        return match ? match.amount : 0;
      })()
    }));
  });

  filteredMonthlySales = computed(() => {
    return salesData.monthlySales;
  });

  lineChartData = computed(() => {
    const range = this.filters.dateRange();

    if (range === 'year') {
      const monthlySales = this.filteredMonthlySales();
      return {
        labels: monthlySales.map(m => m.month),
        datasets: [
          {
            label: 'Actual Sales',
            data: monthlySales.map(m => m.amount),
            borderColor: 'var(--chart-color-1)',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          } as ChartDataset<'line'>,
          {
            label: 'Target',
            data: monthlySales.map(m => m.target),
            borderColor: 'var(--chart-color-2)',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 3,
          } as ChartDataset<'line'>,
        ],
      };
    }

    const sales = this.filteredDailySales();
    return {
      labels: sales.map(d => d.date),
      datasets: [
        {
          label: 'Daily Sales',
          data: sales.map(d => d.amount),
          borderColor: 'var(--chart-color-1)',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        } as ChartDataset<'line'>,
      ],
    };
  });
}
