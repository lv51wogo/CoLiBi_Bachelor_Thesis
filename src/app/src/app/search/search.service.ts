import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Search} from "../shared/models/search.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl = `${environment.baseUrl}/api/search/`

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }


  /* GET search for occurrence and the related works and authors   */
  searchOccurrences(term: string): Observable<Search> {
    const url = `${this.searchUrl}/occur/${term}`;
    if (!term.trim()) {
      // if not search term, return empty arrays.
      return of({});
    }
    return this.http.get<Search>(url).pipe(
      map((data: Search) => {
        return data;
      }), catchError(err => {
        return throwError('error occurred while fetching data')
      })
    );
  }

  /* GET search for author and the related works and occurrences */
  searchAuthors(term: string): Observable<Search> {
    const url = `${this.searchUrl}/authors/${term}`;
    if (!term.trim()) {
      // if not search term, return empty arrays.
      return of({});
    }
    return this.http.get<Search>(url).pipe(
      map((data: Search) => {
        return data;
      }), catchError(err => {
        return throwError('error occurred while fetching data')
      })
    );
  }

  /* GET search for works and the related authors and occurrences */
  searchWorks(term: string): Observable<Search> {
    const url = `${this.searchUrl}/works/${term}`;
    if (!term.trim()) {
      // if not search term, return empty arrays.
      return of({});
    }
    return this.http.get<Search>(url).pipe(
      map((data: Search) => {
        return data;
      }), catchError(err => {
        return throwError('error occurred while fetching data')
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
