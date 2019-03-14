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
  private isFavorite;

  private favoriteList = [];

  constructor(public navCtrl: NavController, private navParams: NavParams, private omdbProvider: OmdbProvider, private favoriteListProvider: FavoriteListProvider) {
  }

  ionViewWillEnter() {
    this.imdbId = this.navParams.get('imdbID') || '';
    this.isFavorite = false;

    this.favoriteListProvider.getList().then((val) => {
      this.favoriteList = val;

      this.favoriteList.forEach((fav) => {
        if (fav.imdbID == this.imdbId) {
          this.isFavorite = true;
        }
      });
    });

    this.omdbProvider.getInfos(this.imdbId).subscribe((data) => {
      console.log(data);
      this.allInfos = data;
    });
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
      this.favoriteListProvider.addFavorite(this.allInfos);
      this.isFavorite = true;
    } else if (this.allInfos && !bool) {
      this.favoriteList.forEach((fav, index) => {
        if (fav.imdbID == this.imdbId) {
          this.favoriteListProvider.removeFavorite(index);
          this.isFavorite = false;
        }
      });
    }
  }

}
