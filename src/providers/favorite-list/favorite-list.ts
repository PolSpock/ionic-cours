import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoriteListProvider {

  private favoriteList = [];
  private favoriteListIsInit = false;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello FavoriteListProvider Provider');
  }

  public addFavorite(fav) {
    //this.favoriteList.push(fav);
    console.log('addFavorite');
    //console.log(nativeStorage);
    this.favoriteList.push(fav);

    // set a key/value
    this.storage.set('favoriteList', this.favoriteList).then((val) => { console.log("favoriteList " + val) });
  }

  public removeFavorite(index) {
    console.log('removeFavorite');
    this.favoriteList.splice(index, 1);

    this.storage.set('favoriteList', this.favoriteList).then((val) => { console.log("favoriteList " + val) });
  }

  public getLength() {
    return this.favoriteList.length;
  }

  private async initFavoriteList() {
    console.log("initFavoriteList");
    this.favoriteList = await this.storage.get('favoriteList').then((list) => {
      console.log('Your favofavoriteListriteList ', list);

      console.log('fini');

      return list || [];
    }, (error) => { console.log(error); });

    console.log('je retounre');
  }

  public async getList() {
    console.log("getList");

    if (!this.favoriteListIsInit) {
      await this.initFavoriteList();
      console.log('await terminé');
      console.log(this.favoriteList);
      this.favoriteListIsInit = true;
    }

    console.log(this.favoriteList);

    return this.favoriteList;
  }
}
