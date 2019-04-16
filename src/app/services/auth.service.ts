import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; // Hmmm
import { StorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
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
        afAuth.auth.onAuthStateChanged(this.authStateChanged);
        afAuth.auth.onIdTokenChanged(this.tokenChanged);
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
            user.getIdToken().then(result => {
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
        return this.afAuth.auth.currentUser;
    }

    getIdToken(): string {
        return this.token;
    }

    userDisplayName(): string {
        if (this.isAuthenticated()) {
            return this.getUser().displayName;
        } else {
            return 'not authenticated';
        }
    }

    userEmail(): string {
        if (this.isAuthenticated()) {
            return this.getUser().email;
        } else {
            return 'not authenticated';
        }
    }

    // signInWithGoogle() {
    //     var self = this;
    //     self.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //         .then(function () {
    //             console.log('Sign in with Google');
    //             var provider = new firebase.auth.GoogleAuthProvider();
    //             firebase.auth().signInWithRedirect(provider);
    //         })
    //         .catch(function (error) {
    //             console.error('Authentication setPersistance error code: ' + error.code + '(' + error.message + ')');
    //         });
    // }

    signInWithGoogle() {
        const self = this;
        console.log('Signing in with Google');
        self.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                console.log('Persistence set');
                const provider = new firebase.auth.GoogleAuthProvider();
                // firebase.auth().signInWithRedirect(provider)
                firebase.auth().signInWithPopup(provider)
                    .then(() => {
                        console.log('signInWithRedirect: Signed in');

                    })
                    .catch(error => {
                        console.error('signInWithRedirect error code: ' + error.code + '(' + error.message + ')');
                    });
                console.log('Setting up get redirect result');
                firebase.auth().getRedirectResult().then(result => {
                    console.log('promise result: ', result);
                    if (result.user) {
                        console.log('getRedirectResult');
                    }
                });
            })
            .catch (error => {
            console.error('Authentication setPersistance error code: ' + error.code + '(' + error.message + ')');
        });
    }


    signOut() {
        this.storage.remove(TOKEN_STORAGE_KEY);
        this.storage.remove(USER_STORAGE_KEY);
        this.afAuth.auth.signOut().then(result => {
            console.log('Signed out: ');
        });
    }

    private oauthSignIn(provider: AuthProvider) {
        if (!(window as any).cordova) {
            console.log('oauthSignIn signInWithPopup');
            return this.afAuth.auth.signInWithPopup(provider)
                .then(result => {
                    console.log('User logged in: ', this.getUser().displayName, ' (', this.getUser().email, ')');
                    console.log('Token: ', this.token);
                }).catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error code ', errorCode, ' Message: ', errorMessage);
                });
        } else {
            console.log('oauthSignIn signInWithRedirect');
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(result => {
                    this.getUser().getIdToken(true).then(idToken => {
                        this.token = idToken;
                    });
                    console.log('User logged in: ', this.getUser().displayName, ' (', this.getUser().email, ')');
                    console.log('Token: ', this.token);
                }).catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error code ', errorCode, ' Message: ', errorMessage);
                });
        }
    }

}
