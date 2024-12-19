import { DestroyRef, EventEmitter, Injectable } from "@angular/core";
import { Entry } from "./entries.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EntryService {
  entries: Entry[] = [];
  selectedEntryEvent = new EventEmitter<Entry>();
  entryChangedEvent = new EventEmitter<Entry[]>();
  entryListChangedEvent = new Subject<Entry[]>();
  maxEntryId!: number;

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    this.maxEntryId = this.getMaxId();

    const subscription = this.httpClient
      .get<Entry[]>("http://localhost:3000/entries")
      .subscribe({
        next: (entries) => {
          console.log(entries);
          this.entries = entries;

          this.maxEntryId = this.getMaxId();
          this.entryListChangedEvent.next(entries);
        },
        error(err) {
          console.log("Fetching Entries failed", err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getEntries(): Entry[] {
    return this.entries.slice();
  }

  getEntry(id: string): Entry {
    console.log("Entry id", id);
    return this.entries.find((entry) => entry.id === id) as Entry;
  }

  selectEntry(entry: Entry) {
    this.selectedEntryEvent.emit(entry);
  }

  deleteEntry(entry: Entry) {
    if (!entry) {
      return;
    }

    const pos = this.entries.indexOf(entry);
    if (pos < 0) {
      return;
    }
    this.entries.splice(pos, 1);

    this.httpClient
      .delete("http://localhost:3000/entries/" + entry.id)
      .subscribe((response) => {
        this.entries.splice(pos, 1);
        this.entryListChangedEvent.next(this.entries);
      });
  }

  addEntry(newEntry: Entry) {
    if (newEntry === null) {
      return;
    }

    newEntry.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    // add to database
    this.httpClient
      .post<{ message: string; entry: Entry }>(
        "http://localhost:3000/entries",
        newEntry,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.entries.push(responseData.entry);
        this.entryListChangedEvent.next(this.entries);
      });
  }

  updateEntry(originalEntry: Entry, newEntry: Entry) {
    if (originalEntry == null || newEntry == null) return;

    const pos = this.entries.indexOf(originalEntry);
    if (pos < 0) return;

    newEntry.id = originalEntry.id;
    this.entries[pos] = newEntry;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    // update database
    this.httpClient
      .put("http://localhost:3000/entries/" + originalEntry.id, newEntry, {
        headers: headers,
      })
      .subscribe((response) => {
        this.entries[pos] = newEntry;
        this.entryListChangedEvent.next(this.entries);
      });
  }

  getMaxId(): number {
    let maxId = 0;

    this.entries.forEach((doc) => {
      const currentId = parseInt(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}
