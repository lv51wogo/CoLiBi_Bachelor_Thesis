import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Search} from "../models/search.model";

@Injectable()
export class DataService {

  private resultSource = new BehaviorSubject<Search>({});
  private searchTermSource = new BehaviorSubject<string>('');

  /*GET*/
  currentResult = this.resultSource.asObservable();
  currentSearchTerm = this.searchTermSource.asObservable();

  /*SET*/
  changeResult(result: Search) {
    this.resultSource.next(result)
  }
  changeSearchTerm(term: string){
    this.searchTermSource.next(term);
  }

}
