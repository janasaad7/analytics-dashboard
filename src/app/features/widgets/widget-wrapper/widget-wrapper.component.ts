import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-widget-wrapper',
  imports: [],
  templateUrl: './widget-wrapper.component.html',
  styleUrl: './widget-wrapper.component.scss',
})
export class WidgetWrapperComponent {
  customClasses = input.required();
  dismiss = output();
}
