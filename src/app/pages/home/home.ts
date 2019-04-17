import { Component, ViewChild, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { MagicMessageService } from '../../services/magicmessage.service';
import { AuthService } from '../../services/auth.service';
import { IMagicScreen } from '../../services/magicscreen';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const LAST_USED_SCREEN_INDEX_STORAGE_KEY = 'last-used-screen_index';

// Install servicerWorker if supported on sign-in/sign-up page.
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
// }


@Component({
  selector: 'app-page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePageComponent implements OnInit {

  logPage: any;
  loginInfo = 'No login info';
  public availableScreens: IMagicScreen[] = [];
  searchingForScreens = true;
  private initialSlide = 2;
  triedToSignIn = false;
  public activeScreen = 3;

  public config: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 1,
    centeredSlides: true,
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true,
    watchOverflow: true
  };

  // @ViewChild('swiper-container') public swiperWrapper: any;

  constructor(
    public navCtrl: NavController,
    private magicMessageService: MagicMessageService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.initialSlide = this.storage.get(LAST_USED_SCREEN_INDEX_STORAGE_KEY) || 0;
  }

  ngOnInit() {
    this.setLoginInfo();
    this.readScreens();
  }

  authenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  tryToSignIn() {
    this.login();
    this.triedToSignIn = true;
  }

  // // Getters
  // getAvailableScreens() {
  //   return this.availableScreens;
  // }

  // getActiveScreen() {
  //   return this.availableScreens[this.activeScreen];
  // }

  // getSearchingForScreens() {
  //   return this.searchingForScreens;
  // }

  // setSearchingForScreens(value) {
  //   this.searchingForScreens = value;
  // }

  getLastUsedScreen() {
    return this.storage.get(LAST_USED_SCREEN_INDEX_STORAGE_KEY);
  }

  getInitialSlide() {
    return this.initialSlide;
  }

  onScreenChange(e) {
    console.log('Screen change: ', e);
  }

  // onSwipeLeft(e) {
  //   console.log('Swipe left');
  // }

  // onSwipeRight(e) {
  //   console.log('Swipe right');
  // }

  // Prøv denne: https://blog.envylabs.com/build-your-own-touch-slider-with-hammerjs-af99665d2869

  //

  // login() {
  //   console.log('Loggin in')
  //   this.auth.signInWithGoogle()
  //     .then(
  //       () => {
  //         console.log('Google sign in ok');
  //       },
  //       (error) => {
  //         console.log('Google sign in error:', error.message);
  //       }
  //     );
  // }

  login() {
    console.log('Logging in');
    this.auth.signInWithGoogle();
  }

  setLoginInfo() {
    this.auth.afAuth.authState.subscribe(user => {
      if (user && user.uid) {
        this.loginInfo = 'Logged in as ' + user.displayName;
      } else {
        this.loginInfo = 'Not logged in';
      }
    });
  }

  signOut() {
    this.auth.signOut();
  }

  readScreens() {
    this.auth.afAuth.idToken.subscribe(token => {
      if (token) {
        console.log('Getting screens');
        this.searchingForScreens = true;
        this.cd.detectChanges();
        this.magicMessageService.getScreens().subscribe(data => {
          this.availableScreens = data;
          console.log('Read screens: ', this.availableScreens);
          this.searchingForScreens = false;
          // this.cd.markForCheck();
          this.cd.detectChanges();
        });
      } else {
        this.loginInfo = 'No token';
      }
    });
  }


}