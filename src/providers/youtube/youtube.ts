import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from "rxjs/Observable";
import {map} from "rxjs/operators";

@Injectable()
export class YoutubeProvider {

  private youtubeApiKey: string = 'AIzaSyA89fjZ9U0p-uqNLefEKGs9yGsTlAu3j20';  

  constructor(public http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private httpOptions = {
    headers: new HttpHeaders()
  };

  getIdByTitle(title: string) : Observable<any> {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + title + '%20trailer&key=' + this.youtubeApiKey, this.httpOptions).pipe(
      map(this.extractData)/*,
        catchError(this.handleError)*/);
  }

}
