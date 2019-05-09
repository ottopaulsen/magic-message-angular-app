import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewEncapsulation,
  Directive,
  ElementRef
} from '@angular/core';
import { ChangeDetectorRef, Input } from '@angular/core';
import { LifetimeChipComponent } from '../lifetime-chip/lifetime-chip';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lifetime',
  templateUrl: 'lifetime.html',
  styleUrls: ['lifetime.scss'],
  encapsulation: ViewEncapsulation.None, // Override style for mat-chit-list-wrapper
})
export class LifetimeComponent {

  @ViewChildren('lifetimeChip') badges !: QueryList<any>;

  @Input() selectedMinutes: number;
  @Output() lifetimeChanged = new EventEmitter<number>();

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

  showSelectedBadge() {
    const chip = this.badges.find(badge => badge.selected);
    chip.scrollIntoView();
  }

  lifetimeSelected(minutes: number) {
    this.lifetimeChanged.emit(minutes);
  }

  getAlternatives() {
    return this.alternatives;
  }




}
