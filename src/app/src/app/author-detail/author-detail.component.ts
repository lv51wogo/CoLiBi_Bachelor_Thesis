import {Component, Input, OnInit} from '@angular/core';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../author/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  @Input() author?: Author
  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthor(this.author?.id)
  }
   getAuthor(id:string | undefined) :void {
    if (id){
      this.authorService.getAuthor(id).subscribe(author => this.author = author);
    }
   }
}
