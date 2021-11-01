import {Component, Input, OnInit} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";
import {DataService} from "../shared/services/data.service";
import {WorkService} from "../work/work.service";
import {Search} from "../shared/models/search.model";
import { Work } from '../shared/models/work.model';

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  @Input() occurrences?: Occurrence[]
  searchTerm!: string;

  constructor(private dataService: DataService, private workService: WorkService) { }

  ngOnInit(): void {
    this.dataService.currentSearchTerm.subscribe(term =>
    this.searchTerm = term)
    this.findWorksByOccurrence(this.searchTerm)
    this.dataService.currentResult.subscribe((data: Search) => {
      console.log(data)
    })
  }

  /*GET all works related to the search term*/
  findWorksByOccurrence(occurrence: string): void {
    let works:Work[];
    this.workService.findByOccurrence(occurrence).subscribe((data: Work[]) =>{
      works = data as Work[];
      this.dataService.currentResult.subscribe((data: Search) => {
        data.works = works;
      })
    })
  }
}
