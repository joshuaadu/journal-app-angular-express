import { Pipe, PipeTransform } from "@angular/core";
import { Entry } from "./entries.model";

@Pipe({
  name: "entriesFilter",
  standalone: true,
})
export class EntriesFilterPipe implements PipeTransform {
  transform(entries: Entry[], term: string): Entry[] {
    const filteredList = entries.filter((entry) =>
      entry.title?.toLowerCase()?.includes(term?.toLowerCase())
    );
    return filteredList?.length ? filteredList : entries;
  }
}
