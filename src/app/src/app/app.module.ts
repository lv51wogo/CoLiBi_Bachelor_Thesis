import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {HttpClientModule} from "@angular/common/http";

import {MessagesComponent} from './messages/messages.component';
import {AuthorComponent} from './author/author.component';
import {AuthorDetailComponent} from './author-detail/author-detail.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {ImprintComponent} from './imprint/imprint.component';
import {HomeComponent} from './home/home.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {DataService} from "./shared/services/data.service";
import {WorkComponent} from './work/work.component';
import {WorkDetailComponent} from './work-detail/work-detail.component';
import {OccurrenceComponent} from './occurrence/occurrence.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MessagesComponent,
    AuthorComponent,
    AuthorDetailComponent,
    NavbarComponent,
    AboutComponent,
    ImprintComponent,
    HomeComponent,
    SearchResultComponent,
    AuthorDetailComponent,
    WorkComponent,
    WorkDetailComponent,
    OccurrenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
