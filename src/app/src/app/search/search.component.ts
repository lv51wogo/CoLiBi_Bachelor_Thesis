import { Component, OnInit } from '@angular/core';
import {SearchService} from "./search.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terms$! : Observable<any[]>;
  searchTerm = new Subject<string>();

  constructor(private searchService: SearchService) { }

  search(term: string):void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.terms$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term:string)=> this.searchService.searchTerm(term)),

    );

  }

}
