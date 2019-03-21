import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {SeasonPage} from "../season/season";
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { ExportProvider } from '../../providers/export/export';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private allInfos;
  private imdbId;
  private isFavorite;

  private favoriteList = [];

  private infoImage;
  private colorImdbRating: string = "";
  private totalSeasons;
  private title = "";

  constructor(private platform: Platform, public navCtrl: NavController, private navParams: NavParams,
    private omdbProvider: OmdbProvider, private favoriteListProvider: FavoriteListProvider,
    private youtubeVideoPlayer: YoutubeVideoPlayer, private youtubeProvider: YoutubeProvider,
    private exportProvider: ExportProvider) {
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

    this.omdbProvider.getInfos(this.imdbId).then((data) => {
      console.log(data);
      this.allInfos = data;

      this.treatData();
    });
  }

  private treatData() {
    if (this.allInfos.Title) {
      this.title = (this.allInfos.Title).toUpperCase();
    }

    // Show Seasons
    if (this.allInfos.Type == 'series' && this.allInfos.totalSeasons > 0) {
      this.totalSeasons = this.stringToArray(this.allInfos.totalSeasons)
    }

    // Try to show HD Image
    this.omdbProvider.getImage(this.imdbId).then((data) => {
      console.log(data);
    }, (error) => {
      if (error.status == 200) {
        this.infoImage = this.omdbProvider.getImageUrl(this.imdbId);
      } else if (this.allInfos.Poster != 'N/A') {
        this.infoImage = this.allInfos.Poster;
      } else {
        this.infoImage = "assets/imgs/logo.png";
      }
    });

    // Color imdbRating
    let imdbRating = this.allInfos.imdbRating
    if (imdbRating && imdbRating < 5) {
      this.colorImdbRating = "imdbRatingRed";
    } else {
      this.colorImdbRating = "imdbRatingGreen";
    }
  }

  private stringToArray(value) {
    let season = [];
    for(let i=1; i <= value; i++){
      season.push(i);
    }
    return season
  }

  private showEpisodes(e, nbSeason) {
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

  private downloadImage() {
    alert("downloadImage");
    console.log("downloadImage");

    this.exportProvider.exportImage(this.infoImage);
  };

  private openTrailer() {
    this.youtubeProvider.getIdByTitle(this.allInfos.Title).then((data) => {
      console.log(data);

      const videoId = data.items[0].id.videoId;
      if (videoId) {
        if (this.platform.is('cordova')) {            
          this.youtubeVideoPlayer.openVideo(videoId);
        } else {
          window.open('https://www.youtube.com/watch?v=' + videoId);
        }      
      }
    });
  }
}
