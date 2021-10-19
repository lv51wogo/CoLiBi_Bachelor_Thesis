import {Component, Input, OnInit} from '@angular/core';
import {AuthorService} from "./author.service";
import {Author} from "../shared/models/author.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input() authors?: Author[];
  selectedAuthor?: Author;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
}
