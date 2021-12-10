import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Search} from "../models/search.model";
import {OccurrenceJoin} from "../models/occurrenceJoin";

@Injectable()
export class DataService {

  private resultSource = new BehaviorSubject<Search>({});
  private searchTermSource = new BehaviorSubject<string>('');
  private authorFilter = new BehaviorSubject<string[]>([]);
  private workFilter = new BehaviorSubject<string[]>([]);
  private occurrenceFilter = new BehaviorSubject<OccurrenceJoin[]>([]);
  private searchType = new BehaviorSubject<string>('');

  /*GET*/
  currentResult = this.resultSource.asObservable();
  currentSearchTerm = this.searchTermSource.asObservable();
  currentAuthorFilter = this.authorFilter.asObservable();
  currentWorkFilter = this.workFilter.asObservable();
  currentOccurrenceFilter = this.occurrenceFilter.asObservable();
  currentSearchType = this.searchType.asObservable();

  /*SET*/
  changeResult(result: Search) {
    this.resultSource.next(result)
  }

  changeSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  changeAuthorFilter(authors: string[]) {
    this.authorFilter.next(authors)
    //this.changeWorksFilter([])
  }

  changeWorksFilter(works: string[]) {
    this.workFilter.next(works)
  }

  changeOccurrenceFilter(occurrenceJoin: OccurrenceJoin[]) {
    this.occurrenceFilter.next(occurrenceJoin)
  }

  changeSearchType(searchType: string) {
    this.searchType.next(searchType)
  }

}
