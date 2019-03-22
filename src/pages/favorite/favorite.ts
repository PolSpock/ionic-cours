import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import {DetailPage} from "../detail/detail";
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";
import { FileChooser } from '@ionic-native/file-chooser';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  private favoriteList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteListProvider: FavoriteListProvider,
    private file: File, private filePath: FilePath,
    private fileChooser: FileChooser, private platform: Platform,
    private socialSharing: SocialSharing) {
  }

  ionViewWillEnter(){
    this.favoriteListProvider.getList().then((val) => {
      this.favoriteList = val;
    });
  }

  private showFavoriteDetail(e, fav) {
    this.navCtrl.push(DetailPage, { imdbID: fav.imdbID }).catch(function(err) { console.log(err)});
  }

  private exportFavorite(type: string) {
    this.favoriteListProvider.exportFavorite(type);
  }

  private shareFavorite() {
    this.socialSharing.share('Favorites', 'My Favorites List', JSON.stringify(this.favoriteList)).then(() => {
      alert('Sharing succes');
    }).catch((error) => {
      alert('Sharing error');
      console.log(error);
    });
  }

  private importFavorite() {
    console.log(this.file);

    if (this.platform.is("android")) {
      this.fileChooser.open().then(uri => {
        console.log('uri : ' + JSON.stringify(uri));

        this.filePath.resolveNativePath(uri)
          .then(file => {
            console.log('file ' + JSON.stringify(file));
            let filePath: string = file;
            if (filePath) {
              alert(filePath);
            }
          })
          .catch(err => console.log(err));
      })
        .catch(e => console.log(e));
    }

  }


}
