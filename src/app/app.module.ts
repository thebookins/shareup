import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from 'time-ago-pipe';

import { HttpClientModule } from '@angular/common/http';
import { TwitFollowComponent } from './twit-follow/twit-follow.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    TimeAgoPipe,
    TwitFollowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
