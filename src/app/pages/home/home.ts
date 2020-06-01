import { Component, ViewChild, Inject, OnInit, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { MagicMessageService } from '../../services/magicmessage.service';
import { AuthService } from '../../services/auth.service';
import { IMagicScreen } from '../../services/magicscreen';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const LAST_USED_SCREEN_INDEX_STORAGE_KEY = 'last-used-screen_index';
const lsPrefix = 'Magic-';

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
    triedToSignIn = false;
    public activeScreen = 0;

    public config: SwiperConfigInterface = {
        spaceBetween: 0,
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

    @ViewChildren('screenComponent') screenComponents !: QueryList<any>;


    constructor(
        public navCtrl: NavController,
        private magicMessageService: MagicMessageService,
        private auth: AuthService,
        private cd: ChangeDetectorRef,
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) {
        this.availableScreens = JSON.parse(localStorage.getItem(lsPrefix + 'screens')) || [];
        this.activeScreen = this.readLastUsedScreen(0);
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

    readLastUsedScreen(defaultScreen: number) {
        return this.storage.get(LAST_USED_SCREEN_INDEX_STORAGE_KEY) || defaultScreen;
    }

    saveLastUsedScreen(lastUsedScreen) {
        this.storage.set(LAST_USED_SCREEN_INDEX_STORAGE_KEY, lastUsedScreen);
    }

    onScreenChange(e) {
        this.activeScreen = e;
        this.saveLastUsedScreen(e);
        console.log('Screen change: ', e);
    }

    transitionEnd() {
        const screenComponent = this.screenComponents.toArray()[this.activeScreen];
        screenComponent.display();
    }

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

        const isEquivalent = (a, b) => {
            const aProps = Object.getOwnPropertyNames(a);
            const bProps = Object.getOwnPropertyNames(b);
            if (aProps.length !== bProps.length) {
                return false;
            }

            aProps.forEach((propName, i) => {
                if (bProps[i] !== propName) { return false; }
                if (a[propName] !== b[propName]) {
                    return false;
                }
            });

            return true;
        };

        const arraysEqual = (a, b) => {
            if (a === b) { return true; }
            if (a == null || b == null) { return false; }
            if (a.length !== b.length) { return false; }

            for (let i = 0; i < a.length; ++i) {
                if (!isEquivalent(a[i], b[i])) { return false; }
            }
            return true;
        };

        this.auth.afAuth.idToken.subscribe(token => {
            if (token) {
                console.log('Getting screens');
                this.searchingForScreens = true;
                this.cd.detectChanges();
                this.magicMessageService.getScreens().subscribe(data => {
                    console.log('Read screens: ', data);

                    if (!arraysEqual(this.availableScreens, data)) {
                        this.availableScreens = data;
                    }

                    this.searchingForScreens = false;
                    localStorage.setItem(lsPrefix + 'screens', JSON.stringify(this.availableScreens));
                    this.onScreenChange(this.activeScreen);
                    this.cd.detectChanges();
                });
            } else {
                this.loginInfo = 'No token';
            }
        });
    }

    haveScreens() {
        return (this.availableScreens.length > 0);
    }
}
