import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[journalDropdown]",
  standalone: true,
  host: {
    "(click)": "onToggle($event)",
  },
})
export class DropdownDirective {
  isOpen: boolean = false;
  // private hostElementRef = inject<ElementRef<HTMLDivElement>>(ElementRef);
  constructor(private hostElementRef: ElementRef, private renderer: Renderer2) {
    console.log("DropdownDirective");
  }
  onToggle(event: Event) {
    // console.log('toggle', event);
    const target = event.target as HTMLElement;

    // Find the button and check if it was clicked
    const button = this.hostElementRef.nativeElement.querySelector("button");
    if (button && button.contains(target)) {
      this.isOpen = !this.isOpen;
      this.toggleDropdown();
    }
  }

  private toggleDropdown() {
    const dropdownMenu =
      this.hostElementRef.nativeElement.querySelector('div[role="menu"]');
    if (dropdownMenu) {
      if (this.isOpen) {
        this.renderer.setStyle(dropdownMenu, "display", "block");
      } else {
        this.renderer.setStyle(dropdownMenu, "display", "none");
      }
    }
  }
  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Close the dropdown if clicked outside
    if (!this.hostElementRef.nativeElement.contains(target)) {
      this.isOpen = false;
      this.toggleDropdown();
    }
  }
}
