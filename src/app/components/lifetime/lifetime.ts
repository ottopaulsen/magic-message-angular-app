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
import { ChangeDetectorRef, Input } from '@angular/core';


// tslint:disable-next-line:directive-selector
@Directive({selector: 'badge'})
class ChildDirective {
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lifetime',
  templateUrl: 'lifetime.html',
  styleUrls: ['lifetime.scss'],
  encapsulation: ViewEncapsulation.None, // Override style for mat-chit-list-wrapper
})
export class LifetimeComponent {
  // @ViewChild('divbadges') scroll: any;

  @ViewChildren('badge') bagdes !: QueryList<any>;

  // @ViewChildren(BadgeDirective) badges !: QueryList<BadgeDirective>;

  @Input() selectedMinutes: number;
  @Output() lifetimeChanged = new EventEmitter<number>();

  // public currentIndex: number;

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

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  // showSelectedBadge() {
  //   // Scroll to selected badge
  //   console.log('showSelectedBadge bagdes: ', this.bagdes);
  //   console.log('selectedMinutes = ', this.selectedMinutes);
  //   const badgeId = 'lifetimechip-' + this.selectedMinutes;
  //   console.log('Scrolling to chip ', badgeId);
  //   const badgeElement = document.getElementById(badgeId);
  //   console.log('Found element ', badgeElement);
  //   badgeElement.scrollIntoView();
  // }

  showSelectedBadge() {
    this.bagdes.forEach((badge) => {
      if (badge.nativeElement.getAttribute('aria-selected') === 'true') {
        badge.nativeElement.scrollIntoView();
      }
    });
  }

  lifetimeSelected(minutes) {
    this.lifetimeChanged.emit(minutes);
  }

  select(i: number) {
    console.log('Select index ', i);
    this.lifetimeSelected(this.alternatives[i].minutes);
    // this.cd.detectChanges();
  }

  getAlternatives() {
    return this.alternatives;
  }


}
