import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {DetailPage} from "../detail/detail";

@Component({
  selector: 'page-search-movie',
  templateUrl: 'search-movie.html'
})
export class SearchMoviePage {

  private movieTitle;
  private showCancelButton = true;
  private movies = [];

  constructor(public navCtrl: NavController, public omdbProvider: OmdbProvider) {

  }

  private onInput(e) {
    this.callApi();
  }

  private callApi() {
    this.omdbProvider.getMovies(this.movieTitle).subscribe((data) => { this.movies = data.Search })
  }

  private onClickFuntion(e, movie) {
    console.log(movie);

    this.navCtrl.push(DetailPage, { imdbID: movie.imdbID }).catch(function(err) { console.log(err)});

  }


}
