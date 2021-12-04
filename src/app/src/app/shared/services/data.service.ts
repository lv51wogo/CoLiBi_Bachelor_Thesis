import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Search} from "../models/search.model";

@Injectable()
export class DataService {

  private resultSource = new BehaviorSubject<Search>({});
  /*GET*/
  currentResult = this.resultSource.asObservable();
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSource.asObservable();
  private authorFilter = new BehaviorSubject<string[]>([]);
  currentAuthorFilter = this.authorFilter.asObservable()
  private workFilter = new BehaviorSubject<string[]>([]);
  currentWorkFilter = this.workFilter.asObservable();
  private searchType = new BehaviorSubject<string>('')
  currentSearchType = this.searchType.asObservable()

  /*SET*/
  changeResult(result: Search) {
    this.resultSource.next(result)
  }

  changeSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  changeAuthorFilter(authors: string[]) {
    this.authorFilter.next(authors)
    this.changeWorksFilter([])
  }

  changeWorksFilter(works: string[]) {
    this.workFilter.next(works)
  }

  changeSearchType(searchType: string) {
    this.searchType.next(searchType)
  }

}
