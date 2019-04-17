import { Component, Input, ViewChild, Inject, OnInit } from '@angular/core';
import { MagicMessageService } from '../../services/magicmessage.service';
import { WriteMessageComponent } from '../writemessage/writemessage';
import { LifetimeComponent } from '../lifetime/lifetime';
import { IMagicMessage } from '../../services/magicmessage';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

const LAST_USED_LIFETIME_STORAGE_KEY = 'last-used-lifetime';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'screen',
  templateUrl: 'screen.html',
  styleUrls: ['./screen.scss'],

})
export class ScreenComponent implements OnInit {

  @Input() screenKey: string;
  @Input() screenName: string;
  @ViewChild(LifetimeComponent) private lifetimeComponent: LifetimeComponent;
  @ViewChild(WriteMessageComponent) private writeMessageComponent: WriteMessageComponent;

  constructor(
    private magicMessageService: MagicMessageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.lifetimeComponent.setLifetime(this.readLastUsedLifetime(this.screenKey));
  }

  messageSend(message: string) {
    this.sendMessage();
  }

  lifetimeChanged(lifetime: number) {
    this.saveLastUsedLifetime(lifetime);
  }

  sendMessage() {
    const key = this.screenKey;
    const lifetime = this.lifetimeComponent.getLifetime();
    const message = this.writeMessageComponent.getMessage();
    console.log('Sending message: ' + message + ' (lifetime ' + lifetime + ' minutes) to screen ' + key);
    const msg: IMagicMessage = {
      message,
      sentBy: '',
      sentTime: new Date(),
      lifetime
    };
    this.magicMessageService.sendMessage(key, msg);
    this.writeMessageComponent.setMessage('');
    this.saveLastUsedLifetime(lifetime);
  }

  saveLastUsedLifetime(lifetime) {
    this.storage.set(LAST_USED_LIFETIME_STORAGE_KEY + this.screenKey, lifetime);
  }

  readLastUsedLifetime(screen): number {
    const last = this.storage.get(LAST_USED_LIFETIME_STORAGE_KEY + screen);
    return last ? last : 60;
  }

}
