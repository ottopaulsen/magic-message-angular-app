import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewEncapsulation,
  Directive
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '.badge' })
class BadgeDirective {
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lifetime',
  templateUrl: 'lifetime.html',
  styleUrls: ['lifetime.scss'],
  encapsulation: ViewEncapsulation.None, // Override style for mat-chit-list-wrapper
})
export class LifetimeComponent implements AfterViewInit {
  @ViewChild('divbadges') scroll: any;
  // @ViewChildren('badge') badges: QueryList<any>;

  @ViewChildren(BadgeDirective) badges !: QueryList<BadgeDirective>;

  private alternatives = [
    { minutes: 1, label: '1 m' },
    { minutes: 15, label: '15 m' },
    { minutes: 30, label: '30 m' },
    { minutes: 60, label: '1 h' },
    { minutes: 180, label: '3 h' },
    { minutes: 360, label: '6 h' },
    { minutes: 720, label: '12 h' },
    { minutes: 1440, label: '24 h' },
    { minutes: 4320, label: '2 d' },
    { minutes: 8640, label: '4 d' },
  ];

  public currentIndex: number;

  @Output() lifetimeChanged = new EventEmitter<number>();

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    // Scroll to selected badge
    const badgeId = 'lifetimechip-' + this.alternatives[this.currentIndex].minutes;
    console.log('Scrolling to chip ', badgeId);
    const badgeElement = document.getElementById(badgeId);
    console.log('Found element ', badgeElement);
    badgeElement.scrollIntoView();

    const containerId = 'divbadges';
    const containerElement = document.getElementById(containerId);
    const matElement = containerElement.getElementsByClassName('mat-chip-list-wrapper');
    console.log('Found container ', matElement);

    containerElement.focus();
    containerElement.scrollLeft = 300;
    matElement[0].scrollLeft = 300;

    this.cd.detectChanges();

    // const clientWidth = containerElement.clientWidth;
    // const badgeLeft = badgeElement.offsetLeft;
    // const badgeWidth = badgeElement.clientWidth;
    // const pos = badgeLeft - clientWidth / 2 + badgeWidth / 2;
    // console.log('Scrolling to pos ', pos);
    // matElement[0].scrollLeft = pos;

  }

  scrollChip() {
    const badgeId = 'lifetimechip-' + this.alternatives[this.currentIndex].minutes;
    console.log('Scrolling to chip ', badgeId);
    const badgeElement = document.getElementById(badgeId);
    console.log('Found element ', badgeElement);
    badgeElement.scrollIntoView();

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
    console.log('Select index ', i);
    this.currentIndex = i;
    this.lifetimeSelected();
    this.cd.detectChanges();
  }

  getAlternatives() {
    return this.alternatives;
  }


}
