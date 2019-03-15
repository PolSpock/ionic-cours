import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteListProvider} from "../../providers/favorite-list/favorite-list";
import {DetailPage} from "../detail/detail";
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  private favoriteList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private favoriteListProvider: FavoriteListProvider,
              private file: File, private filePath: FilePath) {
  }

  ionViewWillEnter(){
    this.favoriteListProvider.getList().then((val) => {
      this.favoriteList = val;

    });
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
    /*
    let papa = '';
    console.log(JSON.stringify(this.favoriteList));
    let parsedData = papa.parse(JSON.stringify(this.favoriteList), {
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false, //or 'greedy',
      columns: null //or array of strings
    }).data;
    this.headerRow = parsedData[0];

    console.log(this.headerRow);

    parsedData.splice(0, 1);
    this.csvData = parsedData;

    console.log(this.csvData);

    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.favoriteList
    });

    // Dummy implementation for Desktop download purpose
    let blob = new Blob([csv]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "favorite.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    */
  }

  private downloadJSON() {
    // Dummy implementation for Desktop download purpose
    let blob = new Blob([JSON.stringify(this.favoriteList)]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "favorite.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private importFavorite() {
    console.log(this.file);
    let path = this.file.dataDirectory + 'file.jpg';
    this.file.resolveLocalFilesystemUrl(path).then((fileName) => {
      let filePathWithoutFileName = path.toString().replace(fileName.name.toString(), '');
      this.filePath.resolveNativePath(filePathWithoutFileName).then((nativePath) => {
        console.log(nativePath);
        console.log(fileName.name);
        //his.read(nativePath, fileName.name);
      });
    });
  }


}
