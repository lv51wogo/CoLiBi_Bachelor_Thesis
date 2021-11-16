import {Component, Input, OnInit} from '@angular/core';
import {Work} from "../shared/models/work.model";
import {DataService} from "../shared/services/data.service";
import {Search} from "../shared/models/search.model";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  works?: Work[];
  selectedWork?: Work;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.initWorks()
  }

  initWorks(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.works = data.works as Work[]
    })
  }

  onSelect(work: Work): void {
    this.selectedWork = work;
  }
}
