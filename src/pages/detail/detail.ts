import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {SeasonPage} from "../season/season";
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private allInfos;
  private imdbId;
  private isFavorite = false;

  private favoriteList = [];

  constructor(public navCtrl: NavController, private navParams: NavParams, private omdbProvider: OmdbProvider, private favoriteListProvider: FavoriteListProvider) {
    let imdbID = this.navParams.get('imdbID');

    console.log(imdbID);

    this.favoriteList = this.favoriteListProvider.getList();
    this.imdbId = imdbID;

    this.favoriteList.forEach((fav) => {
      if (fav.imdbID == this.imdbId) {
        this.isFavorite = true;
      }
    });

    this.omdbProvider.getInfos(this.imdbId).subscribe((data) => {
      console.log(data);
      this.allInfos = data;
    })
  }

  private stringToArray(value) {
    let season = [];
    for(let i=1; i < value; i++){
      season.push(i);
    }
    return season
  }

  private onClickFuntion(e, nbSeason) {
    this.navCtrl.push(SeasonPage, { imdbID: this.allInfos.imdbID, nbSeason: nbSeason }).catch(function(err) { console.log(err)});
  }

  private wannaFavorite(bool: boolean) {
    if (this.allInfos && bool) {
      this.allInfos.favIndex = this.favoriteListProvider.getIndex();
      this.favoriteListProvider.addFavorite(this.allInfos);
      this.isFavorite = true;
    } else if (this.allInfos && !bool) {
      console.log("wannaRemove");

      this.favoriteList.forEach((fav) => {
        if (fav.imdbID == this.imdbId) {
          this.favoriteListProvider.removeFavorite(this.allInfos.favIndex);
          this.isFavorite = false;
        }
      });
    }
  }

}
