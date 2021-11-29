import {Component, OnInit} from '@angular/core';
import {OccurrenceService} from "../occurrence/occurrence.service";
import {DataService} from "../shared/services/data.service";
import {SearchService} from "../search/search.service";
import {Occurrence} from "../shared/models/occurrence.model";
import {OccurrenceAndWorks} from "../shared/models/OccurrenceAndWorks";

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.css']
})
export class OccurrenceDetailComponent implements OnInit {
  searchTerm!: string;
  count!: string;
  countAll!: any[];
  occurrencesWithWorkMetadata!: OccurrenceAndWorks[]
  currentWorkFilter!: string[]

  constructor(private occurrenceService: OccurrenceService, private dataService: DataService, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term
      console.log(this.searchTerm)
      this.getCountAll(this.searchTerm)
      this.getCount(this.searchTerm)
      this.getAllOccurrencesWithWorkMetadata(this.searchTerm)
    })

    this.dataService.currentWorkFilter.subscribe( worksFilter => {
      this.currentWorkFilter = worksFilter;
    })
  }

  getAllOccurrencesWithWorkMetadata(searchTerm: string):void{
    this.occurrenceService.getOccurrencesWithWorkData(searchTerm).subscribe( data => {
      this.occurrencesWithWorkMetadata = data
      console.log(this.occurrencesWithWorkMetadata)
      console.log(this.occurrencesWithWorkMetadata[0].Work)
    })
  }

  getCountAll(searchTerm: string): void {
    this.occurrenceService.getCountAllOccurrences(searchTerm).subscribe(x => {
      this.countAll = x.count
    })
  }

  getCount(searchTerm: string): void {
    this.occurrenceService.getCountOccurrence(searchTerm).subscribe(x => {
      this.count = x
    })
  }
}
