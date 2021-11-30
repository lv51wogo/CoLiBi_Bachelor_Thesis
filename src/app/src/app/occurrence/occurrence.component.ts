import {Component, OnInit} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";
import {DataService} from "../shared/services/data.service";
import {WorkService} from "../work/work.service";
import {Search} from "../shared/models/search.model";
import {AuthorService} from "../author/author.service";
import {OccurrenceService} from "./occurrence.service";

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  occurrences!: Occurrence[];
  searchTerm!: string;
  label = 'Number of occurrences';
  labelsXAxis!: string[];
  labelsYAxis!: any[];

  constructor(private dataService: DataService, private workService: WorkService, private authorService: AuthorService, private occurrenceService: OccurrenceService) {
  }

  ngOnInit(): void {
    this.initOccurrences();
    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term

      this.dataService.currentSearchType.subscribe(searchType => {
        this.getChartData(searchType);

      })
    });
  }

  initOccurrences(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.occurrences = data.occurrences as Occurrence[]
    })
  }

  getChartData(searchType: string): void {
    if (searchType === 'occurrence') {
      this.workService.getCountOfOccurrencePerWork(this.searchTerm).subscribe(x => {
        this.labelsXAxis = x.map(y => y.year);
        this.labelsYAxis = x.map(y => y.count);
      })
    }
    // searchType = work => get all occurs and their count fetched by workId
    // searchType = author => get all occurs and their count in works of given author => fetched by authorId
  }
}
