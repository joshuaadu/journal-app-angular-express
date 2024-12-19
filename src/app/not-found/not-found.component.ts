import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "journal-not-found",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.css",
})
export class NotFoundComponent {}
