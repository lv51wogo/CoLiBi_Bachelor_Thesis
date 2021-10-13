import { Component, OnInit } from '@angular/core';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../author/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  author: Author | undefined;

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthor('Hodgson, William Hope')
  }
   getAuthor(id:string) :void {
    this.authorService.getAuthor(id).subscribe(author => this.author = author);
   }

}
