import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { EntriesComponent } from "./entries/entries.component";

@Component({
  selector: "journal-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    EntriesComponent,
    RouterOutlet,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "journal";
  selectedFeature = "documents";

  switchView(selectedFeature: string) {
    console.log(selectedFeature);
    this.selectedFeature = selectedFeature;
  }
}
