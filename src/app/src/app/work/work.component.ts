import {Component, Input, OnInit} from '@angular/core';
import {Work} from "../shared/models/work.model";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  @Input() works?: Work[];
  selectedWork?: Work;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(work: Work): void {
    this.selectedWork = work;
  }
}
