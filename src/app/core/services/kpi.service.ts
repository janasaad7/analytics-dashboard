import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IKpi} from '../models/kpi.model';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  #http = inject(HttpClient);

  readonly kpis = signal<IKpi[]>([]);

  constructor() {
    this.loadKpis();
  }

  loadKpis() {
    this.#http
      .get<{ kpis: IKpi[] }>('assets/data/kpi-data.json')
      .subscribe(
        {
          next: response => this.kpis.set(response.kpis)
        }
      );
  }

  hideKpi(id: string): void {
    this.kpis.update(stats =>
      stats.map(kpi => kpi.id === id ? { ...kpi, visible: false } : kpi)
    );
  }

  showKpi(id: string): void {
    this.kpis.update(kpis =>
      kpis.map(kpi => kpi.id === id ? { ...kpi, visible: true } : kpi)
    );
  }
}
