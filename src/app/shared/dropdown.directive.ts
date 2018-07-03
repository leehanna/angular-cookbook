import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') dropdownOpen = false;

  constructor() { }

  @HostListener('click') toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
