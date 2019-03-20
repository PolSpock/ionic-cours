import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SearchSeriePage } from '../pages/search-serie/search-serie';
import { DetailPage } from '../pages/detail/detail';
import { SearchMoviePage } from '../pages/search-movie/search-movie';
import { TabsPage } from '../pages/tabs/tabs';
import {SeasonPage} from "../pages/season/season";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OmdbProvider } from '../providers/omdb/omdb';
import {HttpClientModule} from "@angular/common/http";
import { FavoriteListProvider } from '../providers/favorite-list/favorite-list';
import {FavoritePage} from "../pages/favorite/favorite";
import { IonicStorageModule } from '@ionic/storage';
import {FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {FilePath} from "@ionic-native/file-path";
import { FileChooser } from '@ionic-native/file-chooser';
import { ExportProvider } from '../providers/export/export';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeProvider } from '../providers/youtube/youtube';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    SearchSeriePage,
    DetailPage,
    SearchMoviePage,
    TabsPage,
    SeasonPage,
    FavoritePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchSeriePage,
    DetailPage,
    SearchMoviePage,
    TabsPage,
    SeasonPage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OmdbProvider,
    FavoriteListProvider,
    FileTransfer,
    AndroidPermissions,
    FilePath,
    FileChooser,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ExportProvider,
    YoutubeVideoPlayer,
    YoutubeProvider,
    SocialSharing
  ]
})
export class AppModule {}
