import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  @Input() public placeholder: string = '';
  @Output() public onValue: EventEmitter<string> = new EventEmitter();
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter();
  // @ViewChild('txtInput') public input! : ElementRef<HTMLInputElement>;
  private debouncer: Subject<string> = new Subject<string>;

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(1000)).subscribe(value => this.onDebounce.emit(value));
  }

  emitValue(value: string){
    if(value.length === 0) return;
    this.onValue.emit(value);
    // this.onValue.emit(this.input.nativeElement.value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
