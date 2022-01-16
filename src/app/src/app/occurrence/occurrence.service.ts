import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";
import {CountModel} from "../shared/models/count.model";
import {catchError, tap} from "rxjs/operators";
import {OccurrenceAndWorks} from "../shared/models/occurrenceAndWorks";

@Injectable({
  providedIn: 'root'
})
export class OccurrenceService {
  private occurrenceUrl = 'http://localhost:8080/api/occur';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  /*GET count of all occurrences matching the searchTerm*/
  getCountAllOccurrences(searchTerm: string): Observable<CountModel> {
    const url = `${this.occurrenceUrl}/countAll/${searchTerm}`;
    return this.http.get<CountModel>(url).pipe(
      tap(_ => this.log(`fetched count for occurrences matching term= ${searchTerm}`)),
      catchError(this.handleError<CountModel>(`getCountAll term ${searchTerm}`))
    );
  }

  /*GET count of all occurrences matching the workId*/
  getCountAllOccurrencesByWork(searchTerm: string): Observable<CountModel> {
    console.log('searchTerm: ', searchTerm)
    const url = `${this.occurrenceUrl}/countAllWork/${searchTerm}`;
    return this.http.get<CountModel>(url).pipe(
      tap(_ => this.log(`fetched count for occurrences for workId= ${searchTerm}`)),
      catchError(this.handleError<CountModel>(`getCountAllWork term ${searchTerm}`))
    );
  }

  /*GET count total of occurrence matching searchTerm*/
  getCountOccurrence(searchTerm: string): Observable<string> {
    const url = `${this.occurrenceUrl}/count/${searchTerm}`;
    return this.http.get<string>(url).pipe(
      tap(_=> this.log('fetched count')),
      catchError(this.handleError<string>(`getCount ${searchTerm}`))
    );
  }

  //get Occurrences with associated Work metadata
  getOccurrencesWithWorkData(searchTerm:string): Observable<OccurrenceAndWorks[]>{
   const url = `${this.occurrenceUrl}/workOccurData/${searchTerm}`;
    return this.http.get<OccurrenceAndWorks[]>(url).pipe(
      tap(_=> this.log('fetched occurs and works')),
      catchError(this.handleError<OccurrenceAndWorks[]>(`getOccurrencesWithWorkDat ${searchTerm}`))
    );
  }

  getOccurrencesWithWorkDataForAuthor(authorId:string): Observable<OccurrenceAndWorks[]>{
    const url = `${this.occurrenceUrl}/workOccurDataAuthor/${authorId}`;
    return this.http.get<OccurrenceAndWorks[]>(url).pipe(
      tap(_=> this.log('fetched occurs and works for author')),
      catchError(this.handleError<OccurrenceAndWorks[]>(`getOccurrencesWithWorkDat ${authorId}`))
    );
  }

  getOccurrencesForWorks(searchTerm: string): Observable<OccurrenceAndWorks[]>{
    const url = `${this.occurrenceUrl}/occurForWorks/${searchTerm}`;
    return this.http.get<OccurrenceAndWorks[]>(url).pipe(
      tap(_=> this.log('fetched occurs and works')),
      catchError(this.handleError<OccurrenceAndWorks[]>(`findOccurrencesForWorks${searchTerm}`))
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
