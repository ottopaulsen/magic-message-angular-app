// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }



// import { IonicApp, IonicModule, IonicErrorHandler } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicRouteStrategy } from '@ionic/angular';
import { LifetimeComponent } from './components/lifetime/lifetime';
import { MagicMessageAppComponent } from './app.component';
import { MagicMessageService } from './services/magicmessage.service';
import { MessageListComponent } from './components/message-list/message-list';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { ScreenComponent } from './components/screen/screen';
import { StorageServiceModule } from 'angular-webstorage-service';
import { WriteMessageComponent } from './components/writemessage/writemessage';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export const firebaseConfig = environment.fire;

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  spaceBetween: 10,
  slidesPerView: 1,
  centeredSlides: true,
  direction: 'horizontal',
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: false,
  watchOverflow: true
};

@NgModule({
  declarations: [
    MagicMessageAppComponent,
    HomePageComponent,
    MessageListComponent,
    LifetimeComponent,
    WriteMessageComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    StorageServiceModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    SwiperModule
  ],
  bootstrap: [MagicMessageAppComponent],
  entryComponents: [
    MagicMessageAppComponent,
    HomePageComponent,
    MessageListComponent,
    LifetimeComponent,
    WriteMessageComponent,
    ScreenComponent
  ],
  providers: [
    MagicMessageService,
    AngularFireAuth,
    AuthService,
    {provide: ErrorHandler, useClass: ErrorHandler},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG},
  ]
})
export class AppModule {}
