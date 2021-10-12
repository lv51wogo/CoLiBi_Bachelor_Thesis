import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Search} from "../shared/models/search.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl ='http://localhost:8080/api/search'
  constructor( private http: HttpClient,
              private messageService: MessageService) { }


  /* GET taxa whose name contains search term */
  searchTerm(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty taxa array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.searchUrl}/${term}`).pipe(
      map((data: Search[])=>{
        return data;
      }), catchError (err => {
        return throwError('error occurred with fetching data')
      })
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
