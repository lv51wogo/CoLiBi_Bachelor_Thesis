import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of, throwError} from "rxjs";
import {Author} from "../shared/models/author.model";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authorUrl = `${environment.baseUrl}/api/authors`

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /*GET all authors from server*/
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorUrl).pipe(
      map((data: Author[]) => {
        return data;
      }), catchError(err => {
        return throwError('error occurred while fetching authors')
      })
    );
  }

  /*GET author by id*/
  getAuthor(id: string): Observable<Author> {
    const url = `${this.authorUrl}/${id}`;
    return this.http.get<Author>(url).pipe(
      tap(_ => this.log(`fetched hero id= ${id}`)),
      catchError(this.handleError<Author>(`getHero id ${id}`))
    );
  }

  getCountOfOccurrences(term: string): Observable<any[]> {
    const url = `${this.authorUrl}/countOccurs/${term}`
    return this.http.get<any[]>(url).pipe(
      tap(_ => this.log(`fetched count of occurrences per author ${term}`)),
      catchError(this.handleError<any[]>(`getCountOfOccurrence`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`SearchService: ${message}`);
  }
}
