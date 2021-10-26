import {Component, Input, OnInit} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  @Input() occurrences?: Occurrence[]
  searchTerm!: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentSearchTerm.subscribe(term =>
    this.searchTerm = term)
  }
}
