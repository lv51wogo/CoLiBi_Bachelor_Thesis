import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Work} from "../shared/models/work.model";
import {DataService} from "../shared/services/data.service";
import {Search} from "../shared/models/search.model";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  // @ts-ignore
  @ViewChild('workList') workList: ElementRef<HTMLElement>;

  works?: Work[];
  selectedWork?: Work;
  selectedWorks?: string[];
  currentAuthorsFilter!: string[];
  currentOccurFilter!: string[];


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    //this.dataService.changeWorksFilter([])
    this.initWorks()
    this.dataService.currentAuthorFilter.subscribe( authorFilter => {
      this.currentAuthorsFilter = authorFilter;
      console.log(this.currentAuthorsFilter)
      this.uncheckAll()
    })
    this.dataService.currentOccurrenceFilter.subscribe( occurFilter => {
      this.currentOccurFilter = occurFilter.map(function (occur){
        return occur.workId
      });
      console.log(this.currentOccurFilter)
    })

  }

  initWorks(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.works = data.works as Work[]
    })
  }

  onSelect(work: Work): void {
    this.selectedWork = work;
  }

  changeSelection(): void {
    this.selectedWorks = [];
    this.workList.nativeElement.querySelectorAll('input:checked').forEach((element:Element) => {
      // @ts-ignore
      console.log(element.value)
      // @ts-ignore
      this.selectedWorks?.push(element.value)
    })
    this.dataService.changeWorksFilter(this.selectedWorks)
  }

  // @ts-ignore
  uncheckAll() {
    const checkboxes = document.getElementsByName('workBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].checked = !checkboxes[i].checked
    }
  }

  // @ts-ignore
  checkAll() {
    const checkboxes = document.getElementsByName('workBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( !checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].click()
    }
  }
}
