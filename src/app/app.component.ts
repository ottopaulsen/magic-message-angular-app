// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'magic-message-angular-app';
// }

import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { HomePageComponent } from './pages/home/home';
import { AngularFirestore } from '@angular/fire/firestore';
// import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'app.component.html',
  selector: 'app-root',
  styleUrls: ['./app.component.scss']
})
export class MagicMessageAppComponent {
  title = 'magic-message-angular-app';
  public rootPage: any = HomePageComponent;

  constructor(
    // statusBar: StatusBar,
    private auth: AuthService,
    firestore: AngularFirestore) {
  }
}
