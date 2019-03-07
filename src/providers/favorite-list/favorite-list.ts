import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()
export class FavoriteListProvider {

  private favoriteList = [];

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello FavoriteListProvider Provider');
  }

  public addFavorite(fav) {
    this.favoriteList.push(fav);
    console.log('addFavorite')

    this.nativeStorage.setItem('favoriteList', this.favoriteList).then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  public removeFavorite(index) {
    this.favoriteList.splice(index, 1);
  }

  public getLength() {
    return this.favoriteList.length;
  }

  public getList() {

    this.nativeStorage.getItem('favoriteList').then((favoriteList) => {
      console.log('Your age is', favoriteList);
    });

    return this.favoriteList;
  }
}
