import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  pageTitle : string = "Search Engine Application";
  searching : Boolean = false;
  searchResult : any = null;
  constructor() { }

  ngOnInit(): void {
  }

  showSearchBar():void{
    this.searching = true;
  }
  hideSearchBar():void{
    this.searchResult = null;
    this.searching = false;
  }
  submit():void{
    console.log(this.searchResult);
  }

}
