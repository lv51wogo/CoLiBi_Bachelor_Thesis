import { Component, OnInit } from '@angular/core';
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
  categoryModel: any;

  constructor(private searchService: SearchService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  change(val: any){
    this.categoryModel = val;
    console.log(this.categoryModel)
  }

  search(term: string):void {
    if (this.categoryModel == this.occurrence) {
      this.searchService.searchOccurrences(term).subscribe((data: Search) => {
        this.dataService.changeResult(data);
        this.dataService.changeSearchType(this.categoryModel)
      })
      this.dataService.changeSearchTerm(term);
      this.dataService.changeOccurrenceFilter([])
    }
    if (this.categoryModel == this.work){
      console.log("work")
    }
    if (this.categoryModel == this.author){
      this.searchService.searchAuthors(term).subscribe((data: Search) => {
        this.dataService.changeResult(data);
        console.log(data)
        this.dataService.changeSearchType(this.categoryModel)
      })
      this.dataService.changeSearchTerm(term);
      this.dataService.changeOccurrenceFilter([])
    }
  }

}
