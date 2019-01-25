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
import {EpisodePage} from "../pages/episode/episode";
import { FavoriteListProvider } from '../providers/favorite-list/favorite-list';
import {FavoritePage} from "../pages/favorite/favorite";

@NgModule({
  declarations: [
    MyApp,
    SearchSeriePage,
    DetailPage,
    SearchMoviePage,
    TabsPage,
    SeasonPage,
    EpisodePage,
    FavoritePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchSeriePage,
    DetailPage,
    SearchMoviePage,
    TabsPage,
    SeasonPage,
    EpisodePage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbProvider,
    FavoriteListProvider
  ]
})
export class AppModule {}
