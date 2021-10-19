import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Search} from "../models/search.model";

@Injectable()
export class DataService {

  private resultSource = new BehaviorSubject<Search>({});

  /*GET*/
  currentResult = this.resultSource.asObservable();

  constructor() { }

  /*SET*/
  changeResult(result: Search) {
    this.resultSource.next(result)
  }

}
