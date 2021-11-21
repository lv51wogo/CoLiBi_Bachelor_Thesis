import {Component, OnInit} from '@angular/core';
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

  // @ts-ignore
  uncheckAll() {
    const checkboxes = document.getElementsByName('authorBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].checked = !checkboxes[i].checked
    }
    console.log(checkboxes)
  }
}

