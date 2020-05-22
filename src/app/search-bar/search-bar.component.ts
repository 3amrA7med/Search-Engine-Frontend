import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchService } from '../search-bar/search.service';

declare var webkitSpeechRecognition: any;

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
  errorMessage: String;
  options : string[] = [];
  filteredOptions: Observable<string[]>;
  voiceResult:String = '';
  constructor(private router:Router,
              private searchService:SearchService) {
                this.myControl.setValue('');
               }

  ngOnInit(): void {     
  }

  showSearchBar():void{
    this.searching = true;
  }
  hideSearchBar():void{
    this.myControl.setValue('');
    this.searching = false;
  }
  submit():void{
    //this.searchService.setSearchWords(this.myControl.value);
    
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
    this.router.navigate(['/yalla-home']);
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
  }

  stopRecording(){
    this.recording = false;
    // Default color white
    this.recordColor = ""; 
  }

  async startRecording(){
    this.recording = true;
    // warn color when recording
    this.recordColor = "warn"; 
    this.voiceResult = '';
    // Start recording
    this.voiceSearch(); 
    await this.sleep(4000);
    console.log("Voice search result 2: ",this.voiceResult);
    if(this.voiceResult != '')
    {
      this.myControl.setValue(this.voiceResult);
    }
    console.log(this.myControl.value);
    // When recording is finished
    this.stopRecording();
  }
  sleep(ms: number) {
    return new Promise(resolve =>{ setTimeout(resolve, ms)});
  }
  voiceSearch(): void{
    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.lang = 'en-US';
        vSearch.start();
        vSearch.onresult = function(e){
          this.voiceResult = e.results[0][0].transcript;
          console.log("Voice search result: ",this.voiceResult);
          
        }
        vSearch.onerror = function(e){
          console.log("Error in speech recognition.")
          vSearch.stop();
        }
    } else {
      console.log("Your browser don't support our voice search");
      }
  }
}