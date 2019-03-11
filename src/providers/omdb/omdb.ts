import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable } from "rxjs/Observable";

/*
  Generated class for the OmdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmdbProvider {

  private apiKey: string = '75522b56';
  private omdbUrl: string = 'http://www.omdbapi.com/';
  private posterUrl: string = 'http://img.omdbapi.com/';

  private httpOptions = {
    headers: new HttpHeaders()
  };

  /*
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  */

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(public http: HttpClient) {
    console.log('Hello OmdbProvider Provider');
  }

  getMovies(movieTitle: string) : Observable<any> {
    return this.http.get(this.omdbUrl + '?type=movie&s=' + movieTitle + '&apikey=' + this.apiKey, this.httpOptions).pipe(
        map(this.extractData)/*,0
        catchError(this.handleError)*/);
  }

  getSeries(serieTitle: string) : Observable<any> {
    return this.http.get(this.omdbUrl + '?type=series&s=' + serieTitle + '&apikey=' + this.apiKey, this.httpOptions).pipe(
      map(this.extractData)/*,0
        catchError(this.handleError)*/);
  }

  getInfos(omdbId: string) : Observable<any> {
    return this.http.get(this.omdbUrl + '?i=' + omdbId + '&plot=full&apikey=' + this.apiKey, this.httpOptions).pipe(
      map(this.extractData)/*,0
        catchError(this.handleError)*/);
  }

  getSeason(omdbId: string, nbSeason: string) : Observable<any> {
    return this.http.get(this.omdbUrl + '?i=' + omdbId + '&Season=' + nbSeason + '&apikey=' + this.apiKey, this.httpOptions).pipe(
      map(this.extractData)/*,0
        catchError(this.handleError)*/);
  }

  getEpisode(omdbId: string) : Observable<any> {
    return this.http.get(this.omdbUrl + '?i=' + omdbId + '&apikey=' + this.apiKey, this.httpOptions).pipe(
      map(this.extractData)/*,0
        catchError(this.handleError)*/);
  }

  /*
  getMedia() : Observable<any> {
    return this.http.get(this.omdbUrl + '?type=series&apikey=' + this.apiKey, this.httpOptions).pipe(
      map(this.extractData),0
        catchError(this.handleError));
  }
  */

    /*
    return this.http.get(this.cmdbUrl + '?apikey=' + this.apiKey)
      .do((res : Response ) => res.json())
      .map((res : Response ) => res.json());
      */

}
