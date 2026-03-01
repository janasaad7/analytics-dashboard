import {Component, computed, inject} from '@angular/core';
import {IStat} from '../../../core/models/stat.model';
import {StatsService} from '../../../core/services/stats.service';
import {StatCardComponent} from '../stat-card/stat-card.component';

@Component({
  selector: 'app-stats-grid',
  imports: [StatCardComponent],
  templateUrl: './stats-grid.component.html',
  styleUrl: './stats-grid.component.scss',
})
export class StatsGridComponent {
  #statsService = inject(StatsService);

  readonly visibleStats = computed<IStat[]>(() =>
    this.#statsService.stats().filter(stat => stat.visible)
  );

  hideStatCard(id: string): void {
    console.log('hideStatCard called with id:', id);
    this.#statsService.hideStat(id);
  }
}
