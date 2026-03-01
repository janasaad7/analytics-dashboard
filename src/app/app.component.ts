import {Component, inject} from '@angular/core';
import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  themeService = inject(ThemeService);
}
