import {Component, EventEmitter, Output} from '@angular/core';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  value=""
  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter<string>()

  searchText() {
    this.searchEvent.next(this.value)
  }
}

