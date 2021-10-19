import {Component, Input, OnInit} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  @Input() occurrences?: Occurrence[]

  constructor() { }

  ngOnInit(): void {
  }

}
