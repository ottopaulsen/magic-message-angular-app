import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() screenKey: string;

  @Output() messageSend = new EventEmitter<string>();

  constructor(
  ) {
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  sendMessage() {
    console.log('Emitting message');
    this.messageSend.emit(this.message);
  }

}
