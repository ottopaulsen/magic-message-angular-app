import { Component, OnInit, Output, Input, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lifetime-chip',
  templateUrl: './lifetime-chip.html',
  styleUrls: ['./lifetime-chip.scss']
})
export class LifetimeChipComponent implements OnInit {

  @Input() selected: boolean;
  @Input() minutes: number;
  @Input() label: string;
  @Output() select = new EventEmitter<number>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  scrollIntoView() {
    this.element.nativeElement.scrollIntoView();
  }

  clicked() {
    this.select.emit(this.minutes);
  }

}
