import {Component, OnInit} from '@angular/core';
import {OccurrenceService} from "../occurrence/occurrence.service";
import {DataService} from "../shared/services/data.service";
import {SearchService} from "../search/search.service";
import {OccurrenceAndWorks} from "../shared/models/occurrenceAndWorks";

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.css']
})
export class OccurrenceDetailComponent implements OnInit {
  searchTerm!: string;
  count!: string;
  occurrencesWithWorkMetadata!: OccurrenceAndWorks[]
  currentWorkFilter!: string[]

  constructor(private occurrenceService: OccurrenceService, private dataService: DataService, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term
      this.getCount(this.searchTerm)
      this.getAllOccurrencesWithWorkMetadata(this.searchTerm)
    })

    this.dataService.currentWorkFilter.subscribe(worksFilter => {
      this.currentWorkFilter = worksFilter;
    })
  }

  ngOnChanges () {
    this.occurrencesWithWorkMetadata = []
    this.currentWorkFilter = []
    this.ngOnInit()
  }

  getAllOccurrencesWithWorkMetadata(searchTerm: string): void {
    this.dataService.currentSearchType.subscribe(type => {
      if (type === 'occurrence') {
        this.occurrenceService.getOccurrencesWithWorkData(searchTerm).subscribe(data => {
          this.occurrencesWithWorkMetadata = data
        })
      }
      if (type === 'author') {
        this.occurrenceService.getOccurrencesWithWorkDataForAuthor(searchTerm).subscribe(data => {
          this.occurrencesWithWorkMetadata = data
        })
      }
      if (type === 'work') {
        this.occurrenceService.getOccurrencesForWorks(searchTerm).subscribe(data => {
          this.occurrencesWithWorkMetadata = data
          console.log(data)
        })
      }
    })
  }

  getCount(searchTerm: string): void {
    this.occurrenceService.getCountOccurrence(searchTerm).subscribe(x => {
      this.count = x
    })
  }
}
