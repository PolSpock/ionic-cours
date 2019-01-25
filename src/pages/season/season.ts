import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {EpisodePage} from "../episode/episode";

/**
 * Generated class for the SeasonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    this.omdbProvider.getSeason(imdbID, nbSeason).subscribe((data) => {
      this.season = data;

      console.log(this.season)
    })
  }

  private onClickFuntion(e, episode) {
    console.log(episode);

    this.navCtrl.push(EpisodePage, { imdbID: episode.imdbID }).catch(function(err) { console.log(err)});

  }
}
