import {Component, ElementRef, OnInit,ViewChild} from '@angular/core';
import {Author} from "../shared/models/author.model";
import {DataService} from "../shared/services/data.service";
import {Search} from "../shared/models/search.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  // @ts-ignore
  @ViewChild('authorList') authorList: ElementRef<HTMLElement>;

  authors?: Author[];
  selectedAuthor?: Author;
  selectedAuthors?: string[];
  currentOccurFilter!: string[];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.initAuthors()
    this.dataService.currentOccurrenceFilter.subscribe( occurFilter => {
      this.currentOccurFilter = occurFilter.map(function (occur){
        return occur.Work.authorId
      });
      console.log(this.currentOccurFilter)
      this.uncheckAll()
    })
  }

  initAuthors(): void {
    this.dataService.currentResult.subscribe((data: Search) => {
        this.authors = data.authors as Author[];
        console.log(data, 'test')
      }
    )
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }

  changeSelection(): void {
    this.dataService.changeWorksFilter([])
    this.selectedAuthors= [];
    this.authorList.nativeElement.querySelectorAll('input:checked').forEach((element:Element) => {
      // @ts-ignore
      console.log(element.value)
      // @ts-ignore
      this.selectedAuthors.push(element.value)
    })
    this.dataService.changeAuthorFilter(this.selectedAuthors)
  }

  // @ts-ignore
  uncheckAll() {
    const checkboxes = document.getElementsByName('authorBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( checkboxes[i].checked)
        // @ts-ignore
        checkboxes[i].click()
    }
  }

  // @ts-ignore
  checkAll() {
    const checkboxes = document.getElementsByName('authorBox')
    for(let i = 0; i < checkboxes.length ; i++) {
      // @ts-ignore
      if ( !checkboxes[i].checked){
        // @ts-ignore
        checkboxes[i].click()
      }
    }
  }
}

