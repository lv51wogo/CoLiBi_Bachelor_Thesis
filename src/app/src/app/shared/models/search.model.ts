import {Work} from "./work.model";
import {Occurrence} from "./occurrence.model";
import {Author} from "./author.model";

export interface Search {
   works: Work [];
   occurrences: Occurrence[];
   authors: Author[];
}
