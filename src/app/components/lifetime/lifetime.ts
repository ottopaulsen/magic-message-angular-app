import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { MagicMessageService } from '../../services/magicmessage.service';
// import { Gesture } from '../../../node_modules/@ionic/angular/umd';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lifetime',
  templateUrl: 'lifetime.html',
  styleUrls: ['./lifetime.scss'],
  encapsulation: ViewEncapsulation.None, // Override style for mat-chit-list-wrapper
})
export class LifetimeComponent implements AfterViewInit {
  @ViewChild('scroll') scroll: any;
  @ViewChildren('badge') badges: QueryList<any>;

  private alternatives = [
    {minutes: 1, label: '1 m'},
    {minutes: 15, label: '15 m'},
    {minutes: 30, label: '30 m'},
    {minutes: 60, label: '1 h'},
    {minutes: 180, label: '3 h'},
    {minutes: 360, label: '6 h'},
    {minutes: 720, label: '12 h'},
    {minutes: 1440, label: '24 h'},
    {minutes: 4320, label: '2 d'},
    {minutes: 8640, label: '4 d'},
  ];

  private currentIndex: number;

  @Output() lifetimeChanged = new EventEmitter<number>();

  constructor(private magicMessageService: MagicMessageService) {
  }

  ngAfterViewInit() {
    // Scroll to selected badge
    let badgeNo = 0;
    this.badges.forEach(badge => {
      if (badgeNo === this.currentIndex) {
        // const clientWidth = this.scroll._scrollContent.nativeElement.clientWidth;
        const clientWidth = 50;
        const badgeLeft = badge.nativeElement.offsetLeft;
        const badgeWidth = badge.nativeElement.clientWidth;
        const pos = badgeLeft - clientWidth / 2 + badgeWidth / 2;
        // this.scroll._scrollContent.nativeElement.scrollLeft = pos;
      }
      badgeNo++;
    });
  }

  setLifetime(value: number) {
    this.alternatives.forEach((element, i, arr) => {
      if (element.minutes <= value) {
        this.currentIndex = i;
      }
    });
  }

  getLifetime(): number {
    return this.alternatives[this.currentIndex].minutes;
  }

  lifetimeSelected() {
    this.lifetimeChanged.emit(this.getLifetime());
  }

  select(i: number) {
    this.currentIndex = i;
    this.lifetimeSelected();
  }

  getAlternatives() {
    return this.alternatives;
  }


}
