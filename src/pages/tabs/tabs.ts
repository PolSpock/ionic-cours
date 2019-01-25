import { Component } from '@angular/core';

import { SearchSeriePage } from '../search-serie/search-serie';
import { FavoritePage } from '../favorite/favorite';
import { SearchMoviePage } from '../search-movie/search-movie';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchMoviePage;
  tab2Root = SearchSeriePage;
  tab3Root = FavoritePage;

  constructor() {

  }
}
