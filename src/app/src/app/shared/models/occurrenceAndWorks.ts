import {Work} from "./work.model";

export interface OccurrenceAndWorks {
  term: string;
  scientificName: string;
  wordsFrame: number;
  sentence: string;
  workId: string;
  Work: Work;
}
