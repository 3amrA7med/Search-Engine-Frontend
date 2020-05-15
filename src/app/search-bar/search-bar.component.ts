import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  pageTitle : string = "Yalla Search Engine Application";
  searching : Boolean = false;
  searchValue : any = null;
  imageSearch: Boolean = false;
  listOfSuggestions: string[] = [];
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showSearchBar():void{
    this.searching = true;
  }
  hideSearchBar():void{
    this.searchValue = null;
    this.searching = false;
  }
  submit():void{
    this.router.navigate(['/yalla-search', this.searchValue]);
  }
  homeClicked():void{
    this.searchValue = '';
    this.searching = false;
    this.router.navigate(['/yalla-home']);
  }
  

}
