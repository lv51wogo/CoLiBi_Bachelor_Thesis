import { Component, OnInit } from '@angular/core';
import {Work} from "../shared/models/work.model";
import {WorkService} from "./work.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  works: Work[] = [];
  selectedWork?: Work;
  constructor(private workService: WorkService) { }

  ngOnInit(): void {
    this.getWorks()
  }

  getWorks(): void{
    this.workService.getWorks()
      .subscribe(works => this.works = works);
  }

  onSelect(work: Work): void {
    this.selectedWork = work;
  }
}
