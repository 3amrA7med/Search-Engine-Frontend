import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { Search, ImageSearch } from '../search-bar/search-interface';

@Component({
  selector: 'search-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  length : number;
  pageSize : number;
  searchResults : Search[] =[];
  searchValue : string = ''; 
  imageLength : number;
  imagePageSize : number;
  imageSearchResults : ImageSearch[] =[];
  phrase : Boolean;
  constructor(private route:ActivatedRoute,
              private searchService:SearchService) {
                this.pageSize = 5;
                this.length = 0; 
                this.imagePageSize = 8;
                this.imageLength = 0;
                this.phrase = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(p=> {
      let value = this.route.snapshot.paramMap.get('searchValue');
      this.phrase = (this.route.snapshot.paramMap.get('phrase')=="true");
      this.searchValue = value;
      this.searchService.getResults(this.searchValue, 0, this.pageSize,this.phrase).subscribe({
        next : response =>{          
          this.searchResults = response[0].searchResults;
          this.length = response[1].pageDetails.totalSize;
        }
      });

      this.searchService.getImageResults(this.searchValue, 0, this.imagePageSize).subscribe({
        next : response=>{          
          this.imageSearchResults = response[0].searchResults;
          this.imageLength = response[1].pageDetails.totalSize;
        }
      })
      /**
       * 
       *  */ 
  });
  }
  onPageChanged(e) {
    this.pageSize = e.pageSize;
    this.searchService.getResults(this.searchValue, e.pageIndex, e.pageSize,this.phrase).subscribe({
      next : response =>{
        this.searchResults = response[0].searchResults;
      }
    });
  }

  onImagePageChanged(e){
    this.imagePageSize = e.pageSize;
    this.searchService.getImageResults(this.searchValue, e.pageIndex,e.pageSize).subscribe({
      next : response=>{
        this.imageSearchResults = response[0].searchResults;
      } 
    })
  }
  
}
