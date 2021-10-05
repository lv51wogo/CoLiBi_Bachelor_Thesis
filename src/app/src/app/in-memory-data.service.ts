import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const taxa = [
      {id: 11, name: 'cat'},
      {id: 12, name: 'dog'},
      {id: 13, name: 'tree'},
      {id: 14, name: 'fish'},
      {id: 15, name: 'rose'},
      {id: 16, name: 'grass'},
    ];
    return {taxa}
  }
}
