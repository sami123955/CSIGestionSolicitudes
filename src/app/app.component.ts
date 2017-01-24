/*
 * Angular 2 decorators and services
 */
import {
  Component
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: [
    '../assets/css/master.css'
  ],
  templateUrl: 'views/app.component.html'
})
export class AppComponent {

}
