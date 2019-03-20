import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable } from "rxjs/Observable";

@Injectable()
export class OmdbProvider {

  private apiKey: string = '75522b56';
  private omdbUrl: string = 'http://www.omdbapi.com/';
  private posterUrl: string = 'http://img.omdbapi.com/';

  private httpOptions = {
    headers: new HttpHeaders()
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(public http: HttpClient) {
  }

  getMovies(movieTitle: string) : Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.omdbUrl + '?type=movie&s=' + movieTitle + '&apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    });
  }

  getSeries(serieTitle: string) : Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.omdbUrl + '?type=series&s=' + serieTitle + '&apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    });
  }

  getInfos(omdbId: string) : Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.omdbUrl + '?i=' + omdbId + '&plot=full&apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    });
  }

  getSeason(omdbId: string, nbSeason: string) : Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.omdbUrl + '?i=' + omdbId + '&Season=' + nbSeason + '&apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    });
  }

  getImage(omdbId: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.posterUrl + '?i=' + omdbId + '&apikey=' + this.apiKey + '&h=800').subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  getImageUrl(omdbId: string) : string {
    return this.posterUrl + '?i=' + omdbId + '&apikey=' + this.apiKey + '&h=800';
  }
}
