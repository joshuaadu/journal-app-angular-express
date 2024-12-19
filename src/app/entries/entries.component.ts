import { Component, OnInit } from "@angular/core";
import { EntryListComponent } from "./entry-list/entry-list.component";
import { EntryDetailComponent } from "./entry-detail/entry-detail.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "journal-entries",
  standalone: true,
  imports: [EntryListComponent, EntryDetailComponent, RouterOutlet],
  templateUrl: "./entries.component.html",
  styleUrl: "./entries.component.css",
})
export class EntriesComponent {}
