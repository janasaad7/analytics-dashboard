import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStat } from '../models/stat.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  #http = inject(HttpClient);

  readonly stats = signal<IStat[]>([]);

  constructor() {
    this.loadStats();
  }

  loadStats() {
    this.#http
      .get<{ stats: IStat[] }>('assets/data/stats-cards.json')
      .subscribe(
        {
          next: response => this.stats.set(response.stats)
        }
      );
  }

  hideStat(id: string): void {
    this.stats.update(stats =>
      stats.map(stat => stat.id === id ? { ...stat, visible: false } : stat)
    );
  }

  showStat(id: string): void {
    this.stats.update(stats =>
      stats.map(stat => stat.id === id ? { ...stat, visible: true } : stat)
    );
  }
}
