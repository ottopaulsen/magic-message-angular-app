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

  private message = '';


  @Output() messageSend = new EventEmitter<string>();

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  onChange(event) {
    console.log('onChange: ', event);
    console.log('message: ', this.message);
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message): void {
    console.log('Is in angular zone: ', NgZone.isInAngularZone());
    console.log('NgZone: ', NgZone);
    this.message = message;
    this.cd.detectChanges();
  }

  sendMessage() {
    console.log('Emitting message ', this.getMessage());
    this.messageSend.emit(this.getMessage());
    this.setMessage('');
  }

}
