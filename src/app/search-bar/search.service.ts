import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISearch, IImageSearch } from './search-interface';
import { ISuggestion, Suggestion} from './suggestions-interface';
import { ITrends, Trend } from './trends-interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //private localhost = 'http://localhost:8080';
  private localhost = 'http://4b706d3b6de8.ngrok.io';
  
  private searchUrl =  this.localhost+'/api/v1';
  private searchLocation : string = "Egypt";
  private searchLocationAbbr: string = "eg";
  private abbr={
    "Egypt":"eg",
    "France":"fr",
    "Germany":"de",
    "Italy":"it"
  };

  private abbrToLoc={
    "eg":"Egypt",
    "fr":"France",
    "de":"Germany",
    "it": "Italy"
  };


  constructor(private http: HttpClient) { }

  setSearchLocation(loc:string):void{
    this.searchLocation = loc;
    this.searchLocationAbbr = this.abbr[this.searchLocation];
  }

  setSearchLocationAbbr(loc:string):void{
    this.searchLocation = this.abbrToLoc[loc];
    this.searchLocationAbbr = loc;
  }

  getSearchLocation():string{
    return this.searchLocation;
  }

  getSearchLocationAbbr():string{
    return this.abbr[this.searchLocation];
  }

  setHistory(s:String){
    let history = JSON.parse(localStorage.getItem('history'))
    let found;
    if(history == null)
    {
      history = [];
    }
    for (let h of history){
      if(s.toLocaleLowerCase().localeCompare(h.toLocaleLowerCase()) == 0)
      {
        found = true;
        break;
      }
    }
    if(!found)
    {
      history.push(s)
      localStorage.setItem("history", JSON.stringify(history));
    }
  }

  getResults(searchValue:String, pageIndex: number, pageSize: number, phrase:Boolean) : Observable<ISearch>{
    this.setHistory(searchValue);
    return this.http.get<ISearch>(this.searchUrl+'/getResults/' + searchValue +'/'+
    pageIndex+'/'+pageSize+'/'+phrase).pipe(
      map(data =>  data),
      catchError(this.handleError)
    );
  }

  getImageResults(searchValue:String, pageIndex: number, pageSize: number) : Observable<IImageSearch>{
    return this.http.get<IImageSearch>(this.searchUrl+'/getImageResults/' + searchValue +'/'+
    pageIndex+'/'+pageSize).pipe(
      map(data =>  data),
      catchError(this.handleError)
    );
  }

  postSuggestion(s:String){    
    this.setHistory(s);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(this.searchUrl + "/addSuggestion/"+this.searchLocationAbbr, JSON.stringify({
      'suggestion':s
    }), httpOptions);
  }

  getSuggestions(suggest : String):Observable<Suggestion[]>{
    return this.http.get<ISuggestion>(this.searchUrl+'/suggestions/search/suggestions?suggestion='+suggest+'&size=5').pipe(
      map(data =>  data._embedded.suggestions),
      catchError(this.handleError)
    );
  }

  getTrends(country:string):Observable<ITrends>{
    return this.http.get<ITrends>(this.searchUrl+'/getTrends/'+country).pipe(
    map(data =>  data),
    catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = "";
    if(err.error instanceof ErrorEvent)
    {
      errorMessage = `An error occuared: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
}
