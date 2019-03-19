import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import {DetailPage} from "../detail/detail";
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";
import { FileChooser } from '@ionic-native/file-chooser';
import * as papa from 'papaparse';

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
    private fileChooser: FileChooser, private platform: Platform) {
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

  private importFavorite() {
    console.log(this.file);

    /*
    this.fileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
    */

    
    //let path = this.file.dataDirectory + 'file.jpg';
    /*
    let path = 'C:\Users\SPBN06961\Downloads\caf839bc-fcbe-4880-9b9b-f2db755a8baa.jpg';
    this.file.resolveLocalFilesystemUrl(path).then((fileName) => {
      let filePathWithoutFileName = path.toString().replace(fileName.name.toString(), '');
      this.filePath.resolveNativePath(filePathWithoutFileName).then((nativePath) => {
        console.log(nativePath);
        console.log(fileName.name);
        //his.read(nativePath, fileName.name);
      });
    });
    */

    if (this.platform.is("android")) {
      console.log("je suis un android");
      this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
    }

  }


}
