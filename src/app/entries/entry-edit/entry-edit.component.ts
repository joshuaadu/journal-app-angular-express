import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { EntryService } from "../entries.service";
import { FormsModule, NgForm } from "@angular/forms";
import { Entry } from "../entries.model";

@Component({
  selector: "journal-entry-edit",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./entry-edit.component.html",
  styleUrl: "./entry-edit.component.css",
})
export class EntryEditComponent implements OnInit {
  @Input({ required: true }) id!: string;
  @ViewChild("form") entryForm!: NgForm;
  originalEntry!: Entry;
  entry!: Entry;
  editMode: boolean = false;
  groupEntries: Entry[] | undefined;
  constructor(private router: Router, private entryService: EntryService) {}

  ngOnInit(): void {
    console.log(this.id);
    if (this.id == null) {
      this.editMode = false;
      return;
    }
    this.originalEntry = this.entryService.getEntry(this.id);
    // console.log(this.originalEntry);
    if (this.originalEntry == null) {
      return;
    }
    this.editMode = true;
    this.entry = { ...this.originalEntry };
  }
  onCancel() {
    this.router.navigate(["/entries"]);
  }

  onRemoveItem(i: number) {}

  onSubmit() {
    console.log(this.entryForm);
    // const {  } = this.entryForm.value;
    const newEntry: Entry = {
      ...this.entryForm.value,
    };
    if (this.editMode) {
      this.entryService.updateEntry(this.originalEntry, newEntry);
    } else {
      this.entryService.addEntry(newEntry);
    }
    this.router.navigate(["/entries"]);
  }
}
