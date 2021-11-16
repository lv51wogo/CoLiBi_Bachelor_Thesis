import {Component, Input, OnInit} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";
import {DataService} from "../shared/services/data.service";
import {WorkService} from "../work/work.service";
import {Search} from "../shared/models/search.model";
import {Work} from '../shared/models/work.model';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthorService} from "../author/author.service";
import {Author} from "../shared/models/author.model";

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  occurrences!: Occurrence[];
  searchTerm!: string;
  currentSearchResult!: Search;
  constructor(private dataService: DataService, private workService: WorkService, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.initOccurrences()
    this.dataService.currentSearchTerm.subscribe(term =>
      this.searchTerm = term)
    this.findWorksByOccurrence(this.searchTerm)
    this.updateResult()
  }

  initOccurrences(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.occurrences = data.occurrences as Occurrence[]
    })
  }

  /*GET all works related to the search term*/
  findWorksByOccurrence(occurrence: string): Observable<Work[]> {
    return this.workService.findByOccurrence(occurrence).pipe(
      map( (data: Work[]) =>{
        return data;
      })
    );
  }

  findAuthorsByOccurrence(occurrence: string): Observable<Author[]> {
    return this.authorService.findByOccurrence(occurrence).pipe(
      map( (data: Author[]) =>{
        return data;
      })
    );
  }

  updateResult(): void {
    this.dataService.currentResult.subscribe( (data: Search) => {
      this.currentSearchResult = data;
    })

    this.currentSearchResult.works
    this.findWorksByOccurrence(this.searchTerm).subscribe((data:Work[]) => {
      this.currentSearchResult.works = data;
      this.dataService.changeResult(this.currentSearchResult);
    })

    this.findAuthorsByOccurrence(this.searchTerm).subscribe((data: Author[]) => {
      this.currentSearchResult.authors = data;
      this.dataService.changeResult(this.currentSearchResult);
    })
  }
}
