import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl ='api/taxa'
  constructor( private http: HttpClient,
              private messageService: MessageService) { }


  /* GET taxa whose name contains search term */
  searchTerm(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty taxa array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.searchUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found terms matching "${term}"`) :
        this.log(`no terms matching "${term}"`)),
      catchError(this.handleError<any[]>('searchTerm', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a searchService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SearchService: ${message}`);
  }

}
