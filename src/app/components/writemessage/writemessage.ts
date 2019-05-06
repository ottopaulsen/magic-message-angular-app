import { Component, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the WriteMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-writemessage',
  templateUrl: 'writemessage.html',
  styleUrls: ['./writemessage.scss']
})
export class WriteMessageComponent {

  message = '';

  @Output() messageSend = new EventEmitter<string>();

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  onKeyEnter(event) {
    console.log('Enter pressed: ', event);
    this.sendMessage();
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message): void {
    this.message = message;
    this.cd.detectChanges();
  }

  sendMessage() {
    console.log('Emitting message ', this.getMessage());
    this.messageSend.emit(this.getMessage());
    this.setMessage('');
  }

}
