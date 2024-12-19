import { Component } from "@angular/core";
import { DropdownDirective } from "../../shared/dropdown.directive";

@Component({
  selector: "journal-header-user-menu",
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: "./header-user-menu.component.html",
  styleUrl: "./header-user-menu.component.css",
})
export class HeaderUserMenuComponent {}
