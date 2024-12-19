import { Component, Input } from "@angular/core";
import { Entry } from "../entries.model";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "journal-entry-item",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./entry-item.component.html",
  styleUrl: "./entry-item.component.css",
})
export class EntryItemComponent {
  @Input({ required: true }) entry!: Entry;
}
