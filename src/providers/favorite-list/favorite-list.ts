import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavoriteListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteListProvider {

  private favoriteList = [];

  constructor(public http: HttpClient) {
    console.log('Hello FavoriteListProvider Provider');
  }

  public addFavorite(fav) {
    this.favoriteList.push(fav);
    console.log(this.favoriteList)
  }

  public removeFavorite(index) {
    this.favoriteList.splice(index, 1);
  }

  public getIndex() {
    return this.favoriteList.length - 1;
  }

  public getList() {
    return this.favoriteList;
  }
}
