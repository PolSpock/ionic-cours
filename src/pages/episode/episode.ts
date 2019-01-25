import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";

/**
 * Generated class for the EpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
})
export class EpisodePage {

  private episode = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private omdbProvider: OmdbProvider) {
    let imdbID = this.navParams.get('imdbID');

    this.omdbProvider.getEpisode(imdbID).subscribe((data) => {
      console.log(data);
      this.episode = data;

      console.log(this.episode)
    })
  }



}
