import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameCardComponent } from './game-card/game-card.component';

@NgModule({
  declarations: [AppComponent, DetailViewComponent, MainMenuComponent, GameCardComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, HttpClientModule],


  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
