import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'search-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  length : number = 0;
  pageSize : number = 5;
  searchResults : any[] =[];
  searchValue : string = ''; 
  pageEvent : PageEvent;
  constructor(private route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(p=> {
      let value = this.route.snapshot.paramMap.get('searchValue');
      console.log(value);
      this.searchValue = this.processSearchValue(value.toString()); 
  });
  }

  processSearchValue(value:string) : string{
    value = value.split(' ').join('+'); // Remove all spaces and replace with +
    return value;
  }
  
}
