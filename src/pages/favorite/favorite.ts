import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import {DetailPage} from "../detail/detail";
import * as papa from 'papaparse';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  private favoriteList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private favoriteListProvider: FavoriteListProvider) {
    this.favoriteList = this.favoriteListProvider.getList() || [];
  }

  private onClickFuntion(e, fav) {
    console.log(fav);

    this.navCtrl.push(DetailPage, { imdbID: fav.imdbID }).catch(function(err) { console.log(err)});
  }

  private exportFavorite() {

  }

  csvData: any[] = [];
  headerRow: any[] = [];

  private downloadCSV() {
    let parsedData = papa.parse(this.favoriteList).data;
    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);
    this.csvData = parsedData;

    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.favoriteList
    });

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


}
