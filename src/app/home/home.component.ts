import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    }
  ];

  trends: any[]=["Facebook","Twitter","Linkedin","Github"  ];

  history: any[]=["Facebook","Twitter","Linkedin","Github"  ];
  constructor() { }

  ngOnInit(): void {
  }

}
