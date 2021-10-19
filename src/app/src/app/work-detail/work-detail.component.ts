import {Component, Input, OnInit} from '@angular/core';
import {Work} from "../shared/models/work.model";
import {WorkService} from "../work/work.service";

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {
  @Input() work?: Work

  constructor(private workService: WorkService) { }

  ngOnInit(): void {
    this.getWork(this.work?.id)
  }

  getWork(id:string| undefined): void {
    if(id){
      this.workService.getWork(id).subscribe(work => this.work = work)
    }
  }
}
