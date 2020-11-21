import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { ListMoviesComponent } from './movie-rating/list-movies/list-movies.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {SharedService} from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MovieRatingComponent,
    ListMoviesComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
