import {Component, OnInit} from '@angular/core';
import {SearchService} from "./search.service";
import {Search} from "../shared/models/search.model";
import {DataService} from "../shared/services/data.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  result!: Search[];
  occurrence = "occurrence";
  work = "work";
  author = "author";
  categoryModel = "occurrence";
  fromValue = '1705';
  toValue = '1969';

  constructor(private searchService: SearchService, private dataService: DataService) {
  }

  ngOnInit(): void {}

  change(val: any) {
    this.categoryModel = val;}

  search(term: string): void {

    this.dataService.changeFrom(this.fromValue)
    this.dataService.changeTo(this.toValue);
    this.dataService.changeSearchType(this.categoryModel);
    this.dataService.changeSearchTerm(term);
    this.dataService.changeOccurrenceFilter([]);

    if (this.categoryModel == this.occurrence) {
      this.searchService.searchOccurrences(term).subscribe((data: Search) => {
        this.dataService.changeResult(data);
      })
    }

    if (this.categoryModel == this.work) {
      this.searchService.searchWorks(term).subscribe((data: Search) => {
        this.dataService.changeResult(data);
      })
    }

    if (this.categoryModel == this.author) {
      this.searchService.searchAuthors(term).subscribe((data: Search) => {
        this.dataService.changeResult(data);
      })
    }
  }

  readTo(event: any) {
    this.toValue = event.target.value;
  }

  readFrom(event: any) {
    this.fromValue = event.target.value;
  }
}
