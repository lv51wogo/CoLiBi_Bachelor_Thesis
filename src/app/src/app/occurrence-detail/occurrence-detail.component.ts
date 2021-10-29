import {Component, OnInit} from '@angular/core';
import {OccurrenceService} from "../occurrence/occurrence.service";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.css']
})
export class OccurrenceDetailComponent implements OnInit {
  searchTerm!: string;
  count!: string;
  countAll!: any[];

  constructor(private occurrenceService: OccurrenceService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.currentSearchTerm.subscribe(term =>
      this.searchTerm = term)
    console.log(this.searchTerm)
    this.getCountAll(this.searchTerm)
    this.getCount(this.searchTerm)
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
