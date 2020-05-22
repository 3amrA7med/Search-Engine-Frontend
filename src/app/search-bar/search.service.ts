import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISearch, IImageSearch } from './search-interface';
import { ISuggestion, Suggestion} from './suggestions-interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private localhost = 'http://localhost:8080';
  private searchUrl =  this.localhost+'/api/v1';
  private searchWords : String;


  constructor(private http: HttpClient) { }

  setSearchWords(searchWords:String):void{
    this.searchWords = searchWords;
  }

  getSearchWords():String{
    return this.searchWords;
  }


  getResults(searchValue:String, pageIndex: number, pageSize: number, phrase:Boolean) : Observable<ISearch>{
    return this.http.get<ISearch>(this.searchUrl+'/getResults/' + searchValue +'/'+
    pageIndex+'/'+pageSize+'/'+phrase).pipe(
      map(data =>  data),
      catchError(this.handleError)
    );
  }

  getImageResults(searchValue:String, pageIndex: number, pageSize: number) : Observable<IImageSearch>{
    console.log(this.searchUrl+'/getImageResults/' + searchValue +'/'+
    pageIndex+'/'+pageSize);
    return this.http.get<IImageSearch>(this.searchUrl+'/getImageResults/' + searchValue +'/'+
    pageIndex+'/'+pageSize).pipe(
      map(data =>  data),
      catchError(this.handleError)
    );
  }

  postSuggestion(s:String){
    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.searchUrl + "/addSuggestion", JSON.stringify({
      'suggestion':s
    }), httpOptions);
  }

  getSuggestions(suggest : String):Observable<Suggestion[]>{
    return this.http.get<ISuggestion>(this.searchUrl+'/suggestions/search/suggestions?suggestion='+suggest+'&size=5').pipe(
      map(data =>  data._embedded.suggestions),
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
