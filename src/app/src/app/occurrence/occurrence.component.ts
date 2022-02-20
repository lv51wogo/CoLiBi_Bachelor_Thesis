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
  searchType!: string;
  chartType = 'line';
  label = 'Number of occurrences';
  labelsXAxis!: string[];
  labelsYAxis!: any[];
  selectedOccurrences?: string[];
  occurJoin!: OccurrenceJoin[];
  countAll!: any[]
  count!: string;
  from!: string
  to!: string;

  countsOfOccurrencesInWorks: any[] | undefined;

  constructor(private dataService: DataService, private workService: WorkService, private authorService: AuthorService, private occurrenceService: OccurrenceService) {
  }

  ngOnInit(): void {
    this.initOccurrences();

    this.dataService.currentSearchType.subscribe(searchType => {
      this.searchType = searchType;
    });

    this.dataService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term;

      this.getChartData();
      this.getCount();
      this.getCountAll();
    });
  }

  initOccurrences(): void {
    this.dataService.currentFrom.subscribe(fromDate => {
      this.from = fromDate;
    })
    this.dataService.currentTo.subscribe(toDate => {
      this.to = toDate;
    })
    this.dataService.currentResult.subscribe((data: Search) => {
      this.occurrences = data.occurrences as Occurrence[]
    })
  }

  changeSelection(): void {
    this.selectedOccurrences = [];
    let filteredOccurrenceJoin: OccurrenceJoin[] = []
    this.occurrenceList.nativeElement.querySelectorAll('input:checked').forEach((element: Element) => {
      // @ts-ignore
      this.selectedOccurrences.push(element.value)
    })
    this.dataService.currentResult.subscribe((data: Search) => {
      const occurrenceJoin = data.occurrenceJoin as OccurrenceJoin[]
      filteredOccurrenceJoin = occurrenceJoin.filter(occur => this.selectedOccurrences?.includes(occur.term))
    })
    this.occurJoin = filteredOccurrenceJoin;
    this.dataService.changeOccurrenceFilter(filteredOccurrenceJoin)
    this.updateChartData()
  }

  getChartData(): void {
    if (this.searchType === 'occurrence') {
      this.chartType = 'line';
      this.workService.getCountOfOccurrencePerWork(this.searchTerm).subscribe(x => {
        const chartData = x.filter(y => y.year <= this.to && y.year >= this.from)
        this.labelsXAxis = chartData.map(y => y.year);
        this.labelsYAxis = chartData.map(y => y.count);
      })
    }
    if (this.searchType === 'author') {
      this.chartType = 'bar';
      this.workService.getCountOfOccurrencePerWorkForAuthor(this.searchTerm).subscribe(x => {
        const chartData = x.filter(y => y.year <= this.to && y.year >= this.from)

        this.labelsXAxis = chartData.map(y => y.title);
        this.labelsYAxis = chartData.map(y => y.count);
      })
    }
    if (this.searchType === 'work') {
      this.chartType = 'bar';
      this.workService.getCountOfOccurrences(this.searchTerm).subscribe(x => {
        const chartData = x.filter(y => y.year <= this.to && y.year >= this.from)
        const occurrences = chartData.map(y => y.Occurrences)
        this.countsOfOccurrencesInWorks = occurrences[0]
        this.labelsXAxis = this.getTopTwenty(this.countsOfOccurrencesInWorks).map((y: { term: any; }) => y.term);
        this.labelsYAxis = this.getTopTwenty(this.countsOfOccurrencesInWorks).map((y: { count: any; }) => y.count);

      })
    }
  }

  updateChartData() {
    if (this.searchType === 'work' && this.countsOfOccurrencesInWorks) {
      const test = this.countsOfOccurrencesInWorks.filter(y => this.selectedOccurrences?.includes(y.term));
      this.labelsXAxis = this.getTopTwenty(test).map((y: { term: any; }) => y.term);
      this.labelsYAxis = this.getTopTwenty(test).map((y: { count: any; }) => y.count);
    }
  }

  private getTopTwenty(test: any[] | undefined) {
    // @ts-ignore
    return test.sort(function (a: { count: number; }, b: { count: number; }) {

      if (a.count > b.count) return -1;

      if (a.count < b.count) return 1;

      return 0;

    }).slice(0, 20);
  }

// @ts-ignore
  checkAll() {
    const checkboxes = document.getElementsByName('occurBox')
    for (let i = 0; i < checkboxes.length; i++) {
      // @ts-ignore
      if (!checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].click()
    }
  }

  // @ts-ignore
  uncheckAll() {
    const checkboxes = document.getElementsByName('occurBox')
    for (let i = 0; i < checkboxes.length; i++) {
      // @ts-ignore
      if (checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].checked = !checkboxes[i].checked
    }
  }

  getCountAll(): void {
    if (this.searchType === 'occurrence') {
      this.occurrenceService.getCountAllOccurrences(this.searchTerm).subscribe(x => {
        this.countAll = x.count
      })
    }
    if (this.searchType === 'work') {
      this.workService.getCountOfOccurrences(this.searchTerm).subscribe(x => {
        this.countAll = x.map(y => y.Occurrences)[0]
      })
    }
    if (this.searchType === 'author') {
      this.authorService.getCountOfOccurrences(this.searchTerm).subscribe(x => {
        const works = x.map(y => y.Works);
        this.countAll = [].concat.apply([], works[0].map((y: { Occurrences: any; }) => y.Occurrences))
      })
    }
  }

  getCount(): void {
    this.occurrenceService.getCountOccurrence(this.searchTerm).subscribe(x => {
      this.count = x
    })
  }
}
