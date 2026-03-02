import {Component, computed, input, output} from '@angular/core';
import {RoleAccessDirective} from '../../../core/directives/role-access.directive';
import {IKpi} from '../../../core/models/kpi.model';

@Component({
  selector: 'app-kpi-gauge',
  imports: [
    RoleAccessDirective
  ],
  templateUrl: './kpi-gauge.component.html',
  styleUrl: './kpi-gauge.component.scss',
})
export class KpiGaugeComponent {
  kpi = input.required<IKpi>();
  removeKpi = output<string>();

  isTrendPositive(): boolean {
    return this.kpi().trend === 'up';
  }

  dismissKpi(): void {
    this.removeKpi.emit(this.kpi().id);
  }

  readonly cx = 100;
  readonly cy = 100;
  readonly r  = 75;

  readonly radius = 75;
  readonly circumference = Math.PI * this.radius;

  readonly progress = computed(() => {
    const value = this.kpi().current;
    const target = this.kpi().target;
    if (!target) return 0;
    return Math.min(value / target, 1);
  });

  readonly dashOffset = computed(() =>
    this.circumference * (1 - this.progress())
  );

  readonly statusColor = computed(() => {
    const map: Record<string, string> = {
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      danger:  'var(--danger-color)',
    };
    return map[this.kpi().status];
  });
}
