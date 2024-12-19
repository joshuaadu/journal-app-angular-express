import { Component, EventEmitter, Output } from "@angular/core";
import { HeaderUserMenuComponent } from "./header-user-menu/header-user-menu.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "journal-header",
  standalone: true,
  imports: [HeaderUserMenuComponent, RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {}
