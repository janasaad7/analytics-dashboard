import {Component, computed, inject} from '@angular/core';
import {KpiService} from '../../../core/services/kpi.service';
import {IKpi} from '../../../core/models/kpi.model';
import {KpiGaugeComponent} from '../kpi-gauge/kpi-gauge.component';

@Component({
  selector: 'app-kpis-grid',
  imports: [
    KpiGaugeComponent
  ],
  templateUrl: './kpis-grid.component.html',
  styleUrl: './kpis-grid.component.scss',
})
export class KpisGridComponent {
  #kpiService = inject(KpiService);

  readonly visibleKpis = computed<IKpi[]>(() =>
    this.#kpiService.kpis().filter(kpi => kpi.visible)
  );

  hideKpi(id: string): void {
    this.#kpiService.hideKpi(id);
  }
}
