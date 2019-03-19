import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {OmdbProvider} from "../../providers/omdb/omdb";
import {SeasonPage} from "../season/season";
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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

  private totalSeasons;

  constructor(private transfer: FileTransfer,
    private file: File, public navCtrl: NavController, private navParams: NavParams,
    private omdbProvider: OmdbProvider, private favoriteListProvider: FavoriteListProvider) {
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

      this.treatData();
    });

    /*
    this.infoImage = this.omdbProvider.getImage(this.imdbId);
    console.log("this.infoImage");
    console.log(this.infoImage);
    */

  }

  private treatData() {
    // Show Seasons
    if (this.allInfos.Type == 'series' && this.allInfos.totalSeasons > 0) {
      this.totalSeasons = this.stringToArray(this.allInfos.totalSeasons)
    }

    // Try to show HD Image
    this.omdbProvider.getImage(this.imdbId).subscribe((data) => {
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

  downloadImage() {
    alert("downloadImage");
      console.log("downloadImage");
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.href = downloadUrl;
            a.download = "";
            a.click();
            a.remove();
        }
      };
      xhttp.open("GET", this.infoImage, true);
      xhttp.responseType = "blob";
      xhttp.send();

      /*
      const fileTransfer: FileTransferObject = this.transfer.create();

      //const url = this.infoImage;
      //const url = "assets/imgs/logo.png";
      const url = 'http://img.omdbapi.com/?i=tt1592873&apikey=75522b56';

      alert(url);
      alert(this.file.applicationStorageDirectory);
      alert(this.file.externalApplicationStorageDirectory);
      alert(this.file.dataDirectory);
      console.log(this.file);

      fileTransfer.download(url, this.file.cacheDirectory + 'file.jpg').then((entry) => {
        alert('download complete: ' + entry.toURL());
      }, (error) => {
        // handle error
        alert(JSON.stringify(error));
      });

      alert("j'ai terminé");
      */
  };
}
