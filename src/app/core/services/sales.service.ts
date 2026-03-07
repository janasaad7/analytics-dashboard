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

  #dailySalesDateFilter = computed(() => {
    const range = this.#filtersService.dateRange();
    const days = range === 'week' ? 7 : 30;
    return salesData.dailySales.slice(-days);
  });

  #dailySalesDateAndCategoryFilter = computed(() => {
    const category = this.#filtersService.category();
    const sales = this.#dailySalesDateFilter();
    if (category === 'All') return sales;
    return sales.filter(d => d.category === category);
  });

  #dailySalesDateAndRegionFilter = computed(() => {
    const region = this.#filtersService.region();
    const sales = this.#dailySalesDateFilter();
    if (region === 'All') return sales;
    return sales.filter(d => d.region === region);
  });

  filteredDailySales = computed(() => {
    const range = this.#filtersService.dateRange();
    const category = this.#filtersService.category();
    const region = this.#filtersService.region();

    if (range === 'year') return [];

    const sales = this.#dailySalesDateFilter();
    return sales.filter(d =>
      (category === 'All' || d.category === category) &&
      (region === 'All' || d.region === region)
    );
  });

  filteredMonthlySales = computed(() => {
    return salesData.monthlySales;
  });

  lineChartData = computed(() => {
    const range = this.#filtersService.dateRange();
    const chartColors = this.#themeService.currentTheme().chartColors;

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
      labels: sales.map(dailySale => dailySale.date),
      datasets: [
        {
          label: 'Daily Sales',
          data: sales.map(dailySale => dailySale.amount),
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

  regionsBarChartData = computed(() => {
    const chartColors = this.#themeService.currentTheme().chartColors;
    const sales = this.#dailySalesDateAndCategoryFilter();
    const regions = salesData.regionalSales;

    return {
      labels: regions.map(regionalSale => regionalSale.region),
      datasets: [
        {
          data: regions.map(regionalSale =>
            sales
              .filter(dailySale => dailySale.region === regionalSale.region)
              .reduce((sum, dailySale) => sum + dailySale.amount, 0)
          ),
          backgroundColor: regions.map((_, i) => chartColors[i] + '99'),
          borderColor: regions.map((_, i) => chartColors[i]),
          borderWidth: 2,
          borderRadius: 6,
        } as ChartDataset<'bar'>,
      ],
    };
  });

  categoriesBarChartData = computed(() => {
    const chartColors = this.#themeService.currentTheme().chartColors;
    const sales = this.#dailySalesDateAndRegionFilter();
    const categories = salesData.categoryBreakdown;

    return {
      labels: categories.map(categorySale => categorySale.category),
      datasets: [
        {
          data: categories.map(categorySale =>
            sales
              .filter(dailySale => dailySale.category === categorySale.category)
              .reduce((sum, dailySale) => sum + dailySale.amount, 0)
          ),
          backgroundColor: categories.map((_, i) => chartColors[i] + '99'),
          borderColor: categories.map((_, i) => chartColors[i]),
          borderWidth: 2,
          borderRadius: 6,
        } as ChartDataset<'bar'>,
      ],
    };
  });
}
