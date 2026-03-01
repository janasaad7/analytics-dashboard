import {Component, input, output} from '@angular/core';
import { IStat } from '../../../core/models/stat.model';
import {RoleAccessDirective} from '../../../core/directives/role-access.directive';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [
    RoleAccessDirective,
    CurrencyPipe
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  stat = input.required<IStat>();
  removeCard = output<string>();

  isTrendPositive(): boolean {
    return this.stat().trend === 'up';
  }

  dismissStat(): void {
    this.removeCard.emit(this.stat().id);
  }
}
