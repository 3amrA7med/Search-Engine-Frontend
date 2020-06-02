import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trend } from '../search-bar/trends-interface';
import { SearchService } from '../search-bar/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  breakpoint:number;
  websites: any[]=[
    { "name": "Facebook",
      "imageUrl":"../../assets/facebook.webp",
      "url":"https://www.facebook.com/"
    },
    { "name": "Twitter",
      "imageUrl":"../../assets/twitter.jpg",
      "url":"https://www.twitter.com/"
    },
    { "name": "Linkedin",
      "imageUrl":"../../assets/linkedin.png",
      "url":"https://www.linkedin.com/"
    },
    { "name": "Github",
      "imageUrl":"../../assets/github.png",
      "url":"https://github.com/"
    },
    { "name": "Youtube",
      "imageUrl":"../../assets/youtube.jpg",
      "url":"https://youtube.com/"
    },
    { "name": "Gmail",
      "imageUrl":"../../assets/gmail.png",
      "url":"https://gmail.com/"
    } 
  ];

  trends: Trend[];

  history: any[] = [];
  location: string= "Egypt";
  errorMessage: String;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private searchService:SearchService) {
    this.history = JSON.parse(localStorage.getItem('history'))
    if(this.history == null)
    {
      this.history = [];
    }
   }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 3;
    this.route.params.subscribe(p=> {
      let country = this.route.snapshot.paramMap.get('country');
      this.searchService.setSearchLocationAbbr(country);
      this.location = this.searchService.getSearchLocation();
      this.searchService.getTrends(country).subscribe({
        next :results =>{
        this.trends = results[0].trendResults;
      }})

    });
    
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1200) ? 1 : 3;
  }

  trendSelected(trend : string) : void{
    this.router.navigate(['/yalla-search', trend, false]);
  }
  historySelected(history : string) : void{
    this.router.navigate(['/yalla-search', history, false]);
  }

}
