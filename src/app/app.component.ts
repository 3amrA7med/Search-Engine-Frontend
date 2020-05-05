import { Component } from '@angular/core';

@Component({
  selector: 'search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Search Engine Application';
  searching: Boolean = false;
}
