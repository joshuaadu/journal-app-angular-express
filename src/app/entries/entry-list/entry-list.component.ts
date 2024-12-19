import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EntryItemComponent } from "../entry-item/entry-item.component";
import { EntryService } from "../entries.service";
import { Entry } from "../entries.model";
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { EntriesFilterPipe } from "../entries-filter.pipe";

@Component({
  selector: "journal-entry-list",
  standalone: true,
  imports: [EntryItemComponent, RouterLink, FormsModule, EntriesFilterPipe],
  templateUrl: "./entry-list.component.html",
  styleUrl: "./entry-list.component.css",
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];
  subscription!: Subscription;
  term: string = "";
  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.entries = this.entryService.getEntries();

    this.subscription = this.entryService.entryListChangedEvent.subscribe(
      (entriesList: Entry[]) => {
        this.entries = entriesList;
      }
    );
  }

  search(value: string) {
    this.term = value;

    console.log(this.term);
  }
}
