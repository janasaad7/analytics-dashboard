import {computed, inject, Injectable} from '@angular/core';
import {DashboardFilterService} from './dashboard-filter.service';
import salesData from '../../../../public/assets/data/sales-data.json'
import {ChartDataset} from 'chart.js';
import {ThemeService} from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  #filtersService = inject(DashboardFilterService);
  #themeService = inject(ThemeService);

  filteredDailySales = computed(() => {
    const range = this.#filtersService.dateRange();
    const category = this.#filtersService.category();
    const region = this.#filtersService.region();

    if (range === 'year') return [];

    const days = range === 'week' ? 7 : 30;

    const lastNDays = salesData.dailySales.slice(-days);

    if (category === 'All' && region === 'All') return lastNDays;

    return lastNDays.map(day => ({
      ...day,
      amount: (() => {
        const match = salesData.dailySales.find(
          dailySale => dailySale.date === day.date &&
            (category === 'All' || dailySale.category === category) &&
            (region === 'All' || dailySale.region === region)
        );
        return match ? match.amount : 0;
      })()
    }));
  });

  filteredMonthlySales = computed(() => {
    return salesData.monthlySales;
  });

  lineChartData = computed(() => {
    const range = this.#filtersService.dateRange();
    const theme = this.#themeService.currentTheme();
    const chartColors = theme.chartColors;

    if (range === 'year') {
      const monthlySales = this.filteredMonthlySales();
      return {
        labels: monthlySales.map(monthlySale => monthlySale.month),
        datasets: [
          {
            label: 'Actual Sales',
            data: monthlySales.map(monthlySale => monthlySale.amount),
            borderColor: chartColors[0],
            backgroundColor: chartColors[0] + '1A',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          } as ChartDataset<'line'>,
          {
            label: 'Target',
            data: monthlySales.map(monthlySale => monthlySale.target),
            borderColor: chartColors[1],
            backgroundColor: 'transparent',
            tension: 0.4,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 5,
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
          borderColor: chartColors[0],
          backgroundColor: chartColors[0] + '1A',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        } as ChartDataset<'line'>,
      ],
    };
  });
}
