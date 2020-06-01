import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import AuthProvider = firebase.auth.AuthProvider;

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

@Injectable()
export class AuthService {
  private token: string;
  private user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.loadAuthFromStorage();
    afAuth.onAuthStateChanged(this.authStateChanged);
    afAuth.onIdTokenChanged(this.tokenChanged);
  }

  loadAuthFromStorage = (): void => {
    this.token = this.storage.get(TOKEN_STORAGE_KEY);
    this.user = this.storage.get(USER_STORAGE_KEY);
  }

  authStateChanged = (user: firebase.User): void => {
    console.log('authStateChanged user: ', user);
    this.user = user;
    this.storage.set(USER_STORAGE_KEY, user);
  }

  tokenChanged = (user: firebase.User) => {
    console.log('tokenChanged user: ', user);
    this.user = user;
    if (user) {
      user.getIdToken().then((result) => {
        this.token = result;
        this.storage.set(TOKEN_STORAGE_KEY, result);
      });
    }
  }

  isAuthenticated(): boolean {
    return this.user ? (this.token ? true : false) : false;
    // if (this.afAuth.auth.currentUser) {
    //     console.log('isAuthenticated: currentUser exists!')
    //     return true
    // } else {
    //     console.log('isAuthenticated: currentUser = false')
    //     return false
    // }
  }

  getUser() {
    // return this.user
    return this.afAuth.currentUser;
  }

  getIdToken(): string {
    return this.token;
  }

  userDisplayName(): string {
    if (this.isAuthenticated()) {
      return this.user.displayName;
    } else {
      return 'not authenticated';
    }
  }

  userEmail(): string {
    if (this.isAuthenticated()) {
      return this.user.email;
    } else {
      return 'not authenticated';
    }
  }

  signInWithGoogle() {
    const self = this;
    console.log('Signing in with Google');
    self.afAuth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        console.log('Persistence set');
        const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithRedirect(provider)
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            console.log('signInWithRedirect: Signed in');
          })
          .catch((error) => {
            console.error(
              'signInWithRedirect error code: ' +
              error.code +
              '(' +
              error.message +
              ')'
            );
          });
        console.log('Setting up get redirect result');
        firebase
          .auth()
          .getRedirectResult()
          .then((result) => {
            console.log('promise result: ', result);
            if (result.user) {
              console.log('getRedirectResult');
            }
          });
      })
      .catch((error) => {
        console.error(
          'Authentication setPersistance error code: ' +
          error.code +
          '(' +
          error.message +
          ')'
        );
      });
  }

  signOut() {
    this.storage.remove(TOKEN_STORAGE_KEY);
    this.storage.remove(USER_STORAGE_KEY);
    this.afAuth.signOut().then((result) => {
      console.log('Signed out: ', result);
    });
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(window as any).cordova) {
      console.log('oauthSignIn signInWithPopup');
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.getUser().then(user => {
            this.user = user
            console.log('User logged in: ', user.displayName)
            user.getIdToken(true)
              .then((idToken) => {
                this.token = idToken;
                console.log('Token: ', idToken)
              });
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error code ', errorCode, ' Message: ', errorMessage);
        });
    } else {
      console.log('oauthSignIn signInWithRedirect');
      return this.afAuth
        .signInWithRedirect(provider)
        .then((result) => {
          this.getUser().then(user => {
            this.user = user
            console.log('User logged in: ', user.displayName)
            user.getIdToken(true)
              .then((idToken) => {
                this.token = idToken;
                console.log('Token: ', idToken)
              });
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error code ', errorCode, ' Message: ', errorMessage);
        });
    }
  }
}
