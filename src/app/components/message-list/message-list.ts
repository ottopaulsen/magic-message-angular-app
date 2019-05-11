import { Component, Input, OnChanges } from '@angular/core';
import { MagicMessageService } from '../../services/magicmessage.service';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-message-list',
  templateUrl: 'message-list.html',
  styleUrls: ['message-list.scss'],

})
export class MessageListComponent implements OnChanges {

  public messages: Observable<any>;

  @Input() screenKey: string;

  @Input() screenName: string;

  constructor(
    private magicMessageService: MagicMessageService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/baseline-delete-24px.svg'));
  }

  ngOnChanges() {
  }

  display() {
    this.messages = this.magicMessageService.getMessages(this.screenKey);
  }

  calculateAge(time: firestore.Timestamp): string {
    const sec = Math.round((firestore.Timestamp.now().seconds - time.seconds));
    if (sec < 60) { return 'now'; }
    const min = Math.round(sec / 60);
    if (min < 60) { return min + ' min'; }
    const h = Math.round(min / 60);
    if (h < 24) { return h + ' hours'; }
    const d = Math.round(h / 24);
    return d + ' days';
  }

  deleteMessage(path: string) {
    this.magicMessageService.deleteMessage(path);
  }

  canDeleteMessage(message: any) {
    return this.magicMessageService.canDeleteMessage(message);
  }

  showMessage(message: any) {
    return (message.payload && (message.payload.doc.data().sentTime.seconds +
      message.payload.doc.data().validMinutes * 60) > firestore.Timestamp.now().seconds);
  }
  // showMessage(message: any) {
  //   return (message.payload && (message.payload.doc.data().sentTime.getTime() +
  //     message.payload.doc.data().validMinutes * 60000) > Date.now());
  // }
}
