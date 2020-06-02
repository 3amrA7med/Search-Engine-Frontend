import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';

@Component({
  selector: 'search-dialog-countries',
  templateUrl: './dialog-countries.component.html',
  styleUrls: ['./dialog-countries.component.css']
})
export class DialogCountriesComponent implements OnInit {

  location:string;
  constructor(private searchService:SearchService) {
    this.location = this.searchService.getSearchLocation();
   }

  ngOnInit(): void {
    
  }

}
