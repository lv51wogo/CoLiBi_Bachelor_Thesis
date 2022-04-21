import {Component, OnInit} from '@angular/core';
import {OccurrenceService} from "../occurrence/occurrence.service";
import {DataService} from "../shared/services/data.service";
import {OccurrenceAndWorks} from "../shared/models/occurrenceAndWorks";

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.css']
})
export class OccurrenceDetailComponent implements OnInit {
  searchTerm!: string;
  searchType!: string;
  occurrencesWithWorkMetadata!: OccurrenceAndWorks[]
  currentWorkFilter!: string[]

  constructor(private occurrenceService: OccurrenceService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.currentSearchType.subscribe(searchType => {
      this.searchType = searchType;
    })

    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term
      this.currentWorkFilter = [];
      this.getAllOccurrencesWithWorkMetadata()
    })

    this.dataService.currentWorkFilter.subscribe(worksFilter => {
      this.currentWorkFilter = worksFilter;
    })
  }

  getAllOccurrencesWithWorkMetadata(): void {
    if (this.searchType === 'occurrence') {
      this.occurrenceService.getOccurrencesWithWorkData(this.searchTerm).subscribe(data => {
        this.occurrencesWithWorkMetadata = data;
      })
    }
    if (this.searchType === 'author') {
      this.occurrenceService.getOccurrencesWithWorkDataForAuthor(this.searchTerm).subscribe(data => {
        this.occurrencesWithWorkMetadata = data;
      })
    }
    if (this.searchType === 'work') {
      this.occurrenceService.getOccurrencesForWorks(this.searchTerm).subscribe(data => {
        this.occurrencesWithWorkMetadata = data;
      })
    }
  }
}
