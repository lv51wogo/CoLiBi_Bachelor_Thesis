import { Component, OnInit } from '@angular/core';
import {SearchService} from "./search.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Search} from "../shared/models/search.model";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terms$! : Observable<any[]>;
  result!: Search[];

  constructor(private searchService: SearchService, private dataService: DataService) { }

  search(term: string):void {
    this.searchService.searchTerm(term).subscribe((data: Search)=>{
      console.log(data)
      this.dataService.changeResult(data);
    })
  }

  ngOnInit(): void {

  }

}
