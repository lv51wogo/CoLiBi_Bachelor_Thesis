import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {Search} from "../shared/models/search.model";
import {Author} from "../shared/models/author.model";
import {Work} from "../shared/models/work.model";
import {Occurrence} from "../shared/models/occurrence.model";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  authors?: Author[];
  works?: Work[];
  occurrences?: Occurrence[];
  searchResult?: Search;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
      this.works = data.works as Work[];
      this.authors = data.authors as Author[];
      this.occurrences = data.occurrences as Occurrence[];
      console.log(data)
    });
  }
}
