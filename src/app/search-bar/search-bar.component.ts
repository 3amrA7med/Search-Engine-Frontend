import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchService } from '../search-bar/search.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCountriesComponent } from '../dialog-countries/dialog-countries.component';


const { webkitSpeechRecognition }: IWindow = (window as any) as IWindow;
@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  pageTitle : string = "Yalla Search  ";
  searching : Boolean = false;
  myControl = new FormControl();
  recordColor: String ='';
  recording : Boolean = false;
  finishedRecording:Boolean = true;
  options : string[] = [];
  filteredOptions: Observable<string[]>;
  errorMessage:string;
  country:string = "Egypt";

  recognition = new webkitSpeechRecognition;
  constructor(private router:Router,
              private searchService:SearchService,
              private dialog: MatDialog) {
                this.myControl.setValue('');
               }

  ngOnInit(): void {     
    if (typeof webkitSpeechRecognition === "undefined") {
      console.log("error not supported voice search")
    } else {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.addEventListener("result", this.onResult);
    }
  }

  showSearchBar():void{
    this.searching = true;
  }
  hideSearchBar():void{
    this.myControl.setValue('');
    this.searching = false;
  }
  submit():void{    
    this.searchService.postSuggestion(this.myControl.value).subscribe(data =>{
      if (data)
        console.log("Suggestion inserted successfully");
    });
    this.router.navigate(['/yalla-search', this.myControl.value, false]);
  }

  phraseSubmit():void{
    this.searchService.postSuggestion(this.myControl.value).subscribe(data =>{
      if (data)
        console.log("Suggestion inserted successfully");
    });
    this.router.navigate(['/yalla-search', this.myControl.value, true]);
  }
  
  homeClicked():void{
    this.myControl.setValue('');
    this.searching = false;
    this.router.navigate(['/yalla-home',this.searchService.getSearchLocationAbbr()]);
  }

  flagClicked():void{
    let dialogRef = this.dialog.open(DialogCountriesComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if (result != null)
      {
        this.country = result;
        this.searchService.setSearchLocation(result);
        this.router.navigate(['/yalla-home',this.searchService.getSearchLocationAbbr()]);
      }
    })
  }

  searchSuggestions():void{
    this.searchService.getSuggestions(this.myControl.value).subscribe({
      next: suggestions =>{ 
          this.options = [];
          for (let suggestion of suggestions)
          {
            this.options.push(suggestion.suggestion);
          } 
          this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      error: err => this.errorMessage = err
  });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  recordClicked(){
    if (! this.recording)
    {
      this.startRecording();
    }
    else{
      this.stopRecording();
    }
  }

  stopRecording(){
    this.recording = false;
    // Default color white
    this.recordColor = ""; 
    this.recognition.stop();
  }

  startRecording(){
    this.recording = true;
    // warn color when recording
    this.recordColor = "warn"; 
    // Start recording
    //this.voiceSearch(); 
    this.recognition.start();
  }
    
  onResult = event => {
    let x =""
    for (const res of event.results) {
      const text = document.createTextNode(res[0].transcript);

      x = x + text.textContent;
    }
    console.log(x);
    this.myControl.setValue(x);
    this.stopRecording();
  };
}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}