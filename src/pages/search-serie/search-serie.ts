import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {DetailPage} from "../detail/detail";

@Component({
  selector: 'page-search-serie',
  templateUrl: 'search-serie.html'
})
export class SearchSeriePage {

  private serieTitle;
  private showCancelButton = true;
  private series = [];

  constructor(public navCtrl: NavController, public omdbProvider: OmdbProvider) {

  }

  private onInput(e) {
    this.callApi();
  }

  private callApi() {
    this.omdbProvider.getSeries(this.serieTitle).then((data) => { this.series = data.Search });
  }

  private showSerieDetail(e, serie) {
    console.log(serie);

    this.navCtrl.push(DetailPage, { imdbID: serie.imdbID }).catch(function(err) { console.log(err)});

  }

}
