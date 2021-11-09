import {Component, Input, OnInit} from '@angular/core';
import {AuthorService} from "./author.service";
import {Author} from "../shared/models/author.model";
import {DataService} from "../shared/services/data.service";
import {Search} from "../shared/models/search.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors?: Author[];
  selectedAuthor?: Author;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.initAuthors()
  }

  initAuthors(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
        this.authors = data.authors as Author[]
      }
    )
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
}
