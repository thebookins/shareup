import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from 'time-ago-pipe';

import { HttpClientModule } from '@angular/common/http';
import { TwitFollowComponent } from './twit-follow/twit-follow.component';
import { FbLikeComponent } from './fb-like/fb-like.component';

import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    TimeAgoPipe,
    TwitFollowComponent,
    FbLikeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    JwSocialButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
