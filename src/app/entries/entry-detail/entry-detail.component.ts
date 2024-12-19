import { Component, Input } from "@angular/core";
import { Entry } from "../entries.model";
import { EntryService } from "../entries.service";
import { Router, RouterLink } from "@angular/router";
import { WindRefService } from "../../wind-ref.service";

@Component({
  selector: "journal-entry-detail",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./entry-detail.component.html",
  styleUrl: "./entry-detail.component.css",
})
export class EntryDetailComponent {
  selectedEntry: Entry | undefined = undefined;
  @Input()
  set id(id: string) {
    this.selectedEntry = this.entryService.getEntry(id);
  }

  constructor(
    private entryService: EntryService,
    private router: Router,
    private windowService: WindRefService
  ) {}

  onDelete() {
    this.entryService.deleteEntry(this.selectedEntry!);
    this.router.navigate(["/entries"]);
  }
}
