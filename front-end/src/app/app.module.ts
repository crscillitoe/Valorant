import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { WinRateBarsComponent } from './win-rate-bars/win-rate-bars.component';
import { WinRateBarComponent } from './win-rate-bar/win-rate-bar.component';
import { SafePipe } from './services/safe-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    MainMenuComponent,
    GameCardComponent,
    ProfileCardComponent,
    WinRateBarsComponent,
    WinRateBarComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
