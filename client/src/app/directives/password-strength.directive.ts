import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
})
export class PasswordStrengthDirective {
  @Input() control: FormControl;

  constructor(private _el: ElementRef) {}

  @HostListener('window:keyup') ngOnChanges(event: any) {
    const controlName = Object.keys(this.control.parent.controls).find(
      (key) => this.control.parent.controls[key] === this.control
    );

    function containsNumber(input: any): boolean {
      for (let i = 0; i < input.length; i++) {
        if (!isNaN(input.charAt(i)) && !(input.charAt(i) === ' ')) {
          return true;
        }
      }
      return false;
    }

    if (controlName === 'password') {
      let nativeElement = this._el.nativeElement;
      let count = nativeElement.value.length;

      if (count >= 1 && count < 5) {
        nativeElement.style.borderLeft = '4px solid red';
      } else if (count >= 5 && count < 8) {
        nativeElement.style.borderLeft = '4px solid orange';
      } else if (containsNumber(nativeElement.value) && count >= 8) {
        nativeElement.style.borderLeft = '4px solid green';
      } else if (count === 0) {
        nativeElement.style.borderLeft = 'none';
      }
    }
  }
}
