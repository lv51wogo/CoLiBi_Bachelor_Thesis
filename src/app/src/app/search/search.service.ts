import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Search} from "../shared/models/search.model";
import {Occurrence} from "../shared/models/occurrence.model";
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl ='http://localhost:8080/api/search'
  constructor( private http: HttpClient,
              private messageService: MessageService) { }


  /* GET DB Entries who match the search term  */
  searchTerm(term: string): Observable<Search> {
    if (!term.trim()) {
      // if not search term, return empty taxa array.
      return of({});
    }
    return this.http.get<Search>(`${this.searchUrl}/${term}`).pipe(
      map((data: Search)=>{
        return data;
      }), catchError (err => {
        return throwError('error occurred with fetching data')
      })
    );
  }

  searchForOccurrences( occurrence: string): Observable<Occurrence[]>{
    const url = `${this.searchUrl}/occur/${occurrence}`;
    return this.http.get<Occurrence[]>(url).pipe(
      map((data: Occurrence[]) => {
        return data;
      }), catchError( err => {
        return throwError('error occurred while searching occurrences')
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

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a searchService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SearchService: ${message}`);
  }

}
