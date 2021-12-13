import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of} from "rxjs";
import {Work} from "../shared/models/work.model";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private workUrl = 'http://localhost:8080/api/works'
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /*GET work by id*/
  getWork(id:string): Observable<Work>{
    const url = `${this.workUrl}/${id}`
    return this.http.get<Work>(url).pipe(
      tap(_=> this.log(`fetched work id = ${id}`)),
      catchError(this.handleError<Work>(`getWork id ${id}`))
    )
  }

  getCountOfOccurrencePerWork(occurrence: string): Observable<any[]>{
    const url = `${this.workUrl}/countTerm/${occurrence}`
    return this.http.get<any[]>(url).pipe(
      tap(_=> this.log(`fetched count of ${occurrence} per work`)),
      catchError(this.handleError<any[]>(`getCountOfOccurrencePerWork`))
    )
  }

  getCountOfOccurrencePerWorkForAuthor(authorId: string): Observable<any[]>{
    const url = `${this.workUrl}/countTermAuthor/${authorId}`
    return this.http.get<any[]>(url).pipe(
      tap(_=> this.log(`fetched count of occur per work of author ${authorId}`)),
      catchError(this.handleError<any[]>(`getCountOfOccurrencePerWork`))
    )
  }

  getCountOfOccurrences(occurrence: string): Observable<any[]>{
    const url = `${this.workUrl}/countOccur/${occurrence}`
    return this.http.get<any[]>(url).pipe(
      tap(_=> this.log(`fetched count of ${occurrence} per work`)),
      catchError(this.handleError<any[]>(`getCountOfOccurrence`))
    )
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

