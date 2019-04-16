import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMagicMessage } from './magicmessage';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMagicScreen } from './magicscreen';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';


const DBSERVER_URL = environment.magicServerUrl;
// const LAST_USED_SCREEN_STORAGE_KEY = 'last-used-screen';
// const LAST_USED_LIFETIME_STORAGE_KEY = 'last-used-lifetime';

@Injectable()
export class MagicMessageService {

    constructor(
        private http: HttpClient,
        public auth: AuthService,
        private afs: AngularFirestore,
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) {
    }

    sendMessage(screenKey: string, message: IMagicMessage) {
        const serv = this;
        // this.storage.set(LAST_USED_LIFETIME_STORAGE_KEY, message.lifetime)
        message.sentBy = this.auth.userEmail();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + this.auth.getIdToken()
        });
        const uri = DBSERVER_URL + '/screens/' + screenKey + '/messages';
        return serv.http.post(uri, message, { headers })
            .pipe(
                tap(
                    data => { console.log('Tap data: ', data); },
                    error => console.log('Error msg: ', error)
                )
            ).subscribe();
    }

    getMessages(screenKey: string): Observable<any> {
        // this.storage.set(LAST_USED_SCREEN_STORAGE_KEY, screenKey)
        return this.afs.collection('/screens/' + screenKey + '/messages', ref => ref.orderBy('sentTime', 'desc')).snapshotChanges().pipe(
            tap(
                data => {
                    // data.forEach(element => {
                    //     console.log('snapshotChanges element: ', element);
                    //     console.log('snapshotChanges element.payload.doc: ', element.payload.doc);
                    //     console.log('snapshotChanges element.payload.doc.data(): ', element.payload.doc.data());
                    // });
                },
                error => {
                    console.log('snapshotChanges error: ', error);
                }
            )
        );
        // TODO: Detach listener
    }

    deleteMessage(path: string) {
        const serv = this;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + this.auth.getIdToken()
        });
        const uri = DBSERVER_URL + '/' + path;
        return serv.http.delete(uri, { headers })
            .pipe(
                tap(
                    data => { },
                    error => console.log('Error msg: ', error)
                )
            ).subscribe();
    }

    canDeleteMessage(message) {
        return (message.payload.doc.data().sentByEmail === this.auth.userEmail());
    }

    getScreens = (): Observable<IMagicScreen[]> => {
        const token = this.auth.getIdToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token
        });
        return this.http.get<IMagicScreen[]>(DBSERVER_URL + '/screens?dummy=' + Date.now(), { headers })
            .pipe(
                tap(
                    data => {
                        console.log('magigmessageservice getScreens got ' + data.length + ' screens');
                    },
                    error => console.log('Error msg: ', error)
                )
            );
    }


}
