import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Occurrence} from "../shared/models/occurrence.model";
import {DataService} from "../shared/services/data.service";
import {WorkService} from "../work/work.service";
import {Search} from "../shared/models/search.model";
import {AuthorService} from "../author/author.service";
import {OccurrenceService} from "./occurrence.service";
import {OccurrenceJoin} from "../shared/models/occurrenceJoin";

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {
  // @ts-ignore
  @ViewChild('occurrenceList') occurrenceList: ElementRef<HTMLElement>;

  occurrences!: Occurrence[];
  searchTerm!: string;
  chartType = 'line';
  label = 'Number of occurrences';
  labelsXAxis!: string[];
  labelsYAxis!: any[];
  selectedOccurrences?: string[];

  constructor(private dataService: DataService, private workService: WorkService, private authorService: AuthorService, private occurrenceService: OccurrenceService) {
  }

  ngOnInit(): void {
    this.initOccurrences();
    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term

      this.dataService.currentSearchType.subscribe(searchType => {
        this.getChartData(searchType);
      })
    });
  }

  initOccurrences(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.occurrences = data.occurrences as Occurrence[]
    })
  }

  changeSelection(): void {
    this.selectedOccurrences = [];
    let filteredOccurrenceJoin: OccurrenceJoin[] = []
    this.occurrenceList.nativeElement.querySelectorAll('input:checked').forEach((element:Element) => {
      // @ts-ignore
      this.selectedOccurrences.push(element.value)
    })
      this.dataService.currentResult.subscribe((data: Search) => {
        const occurrenceJoin = data.occurrenceJoin as OccurrenceJoin[]
        filteredOccurrenceJoin = occurrenceJoin.filter(occur => this.selectedOccurrences?.includes(occur.term))
        console.log(filteredOccurrenceJoin)
      })
    this.dataService.changeOccurrenceFilter(filteredOccurrenceJoin)
  }

  getChartData(searchType: string): void {
    //filter occurs
    if (searchType === 'occurrence') {
      this.chartType = 'line';
      this.workService.getCountOfOccurrencePerWork(this.searchTerm).subscribe(x => {
        this.labelsXAxis = x.map(y => y.year);
        this.labelsYAxis = x.map(y => y.count);
      })
    }
    if (searchType === 'author') {
      this.chartType = 'bar';
      this.workService.getCountOfOccurrencePerWorkForAuthor(this.searchTerm).subscribe(x => {
        this.labelsXAxis = x.map(y => y.title);
        this.labelsYAxis = x.map(y => y.count);
      })
    }
    if (searchType === 'work') {
      this.chartType = 'bar';
      this.workService.getCountOfOccurrences(this.searchTerm).subscribe(x => {
        console.log(x)
        this.labelsXAxis = x.map(y => y.title);
        this.labelsYAxis = x.map(y => y.count);
      })
    }
  }
  // @ts-ignore
  checkAll() {
    const checkboxes = document.getElementsByName('occurBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( !checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].click()
    }
  }
}
