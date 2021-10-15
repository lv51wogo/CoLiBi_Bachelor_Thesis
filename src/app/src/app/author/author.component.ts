import { Component, OnInit } from '@angular/core';
import {AuthorService} from "./author.service";
import {Author} from "../shared/models/author.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors: Author[] = [];
  selectedAuthor?: Author;
  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
}
