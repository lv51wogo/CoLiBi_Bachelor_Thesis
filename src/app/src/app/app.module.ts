import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from "@angular/common/http";

//used for development
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { AuthorComponent } from './author/author.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { WorkComponent } from './work/work.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MessagesComponent,
    AuthorComponent,
    AuthorDetailComponent,
    WorkComponent,
    WorkDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
