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

  constructor(private searchService: SearchService, private dataService: DataService) { }

  search(term: string):void {
    this.searchService.search(term).subscribe((data: Search)=>{
      this.dataService.changeResult(data);
    })
    this.dataService.changeSearchTerm(term);
  }

  ngOnInit(): void {
  }




  //1 suche occurr  => initalen Suche occur[4]
  // => fill author & work

  //2 author =>
  //=> fill works & occur

  //3 work
  //=> fill author & occur

  /*updateResult(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.currentSearchResult = data;
    })

    this.findWorksByOccurrence(this.searchTerm).subscribe((data: Work[]) => {
      this.currentSearchResult.works = this.currentSearchResult.works?.concat(data);
      this.dataService.changeResult(this.currentSearchResult);
    })

    this.findAuthorsByOccurrence(this.searchTerm).subscribe((data: Author[]) => {
      this.currentSearchResult.authors = this.currentSearchResult.authors?.concat(data);
      this.dataService.changeResult(this.currentSearchResult);
    })
  }*/

}
