import { Injectable, signal } from '@angular/core';
import {TCategory, TDateRange, TRegion} from '../models/filters.type';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterService {
  dateRange = signal<TDateRange>('year');
  category = signal<TCategory>('All');
  region = signal<TRegion>('All');

  setDateRange(range: TDateRange) {
    this.dateRange.set(range);
  }
  setCategory(category: TCategory) {
    this.category.set(category);
  }
  setRegion(region: TRegion) {
    this.region.set(region);
  }
}
