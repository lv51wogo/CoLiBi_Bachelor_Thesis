import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {Observable, of, throwError} from "rxjs";
import {Work} from "../shared/models/work.model";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private workUrl = 'http://localhost:8080/api/works'
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /*GET all works from server*/
  getWorks(): Observable<Work[]>{
    return this.http.get<Work[]>(this.workUrl).pipe(
      map( (data: Work[]) =>{
        return data;
      }), catchError(err => {
        return throwError('error occurred while fetching works ', err)
      })
    );
  }

  /*GET work by id*/
  getWork(id:string): Observable<Work>{
    const url = `${this.workUrl}/${id}`
    return this.http.get<Work>(url).pipe(
      tap(_=> this.log(`fetched work id = ${id}`)),
      catchError(this.handleError<Work>(`getWork id ${id}`))
    )
  }

  /*GET all works in dependence of occurrence*/
  findByOccurrence(occurrence: string): Observable<Work[]> {
    const url = `${this.workUrl}/findByOccur/${occurrence}`
    return this.http.get<Work[]>(url).pipe(
      tap(_=> this.log(`fetched works by occurrence ${occurrence}`)),
      catchError(this.handleError<Work[]>(`findByOccurrence ${occurrence}`))
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

