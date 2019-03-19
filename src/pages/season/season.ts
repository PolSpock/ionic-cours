import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {DetailPage} from "../detail/detail";

@IonicPage()
@Component({
  selector: 'page-season',
  templateUrl: 'season.html',
})
export class SeasonPage {

  private season = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private omdbProvider: OmdbProvider) {
    let imdbID = this.navParams.get('imdbID');
    let nbSeason = this.navParams.get('nbSeason');

    console.log(imdbID);
    console.log("SeasonPage");

    this.omdbProvider.getSeason(imdbID, nbSeason).subscribe((data) => {
      this.season = data;

      console.log(this.season)
    })
  }

  private showEpisodeDetail(e, episode) {
    console.log(episode);

    this.navCtrl.push(DetailPage, { imdbID: episode.imdbID }).catch(function(err) { console.log(err)});

  }
}
