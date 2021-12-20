import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customInputValidator(invalidValue: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const invalid = invalidValue.test(control.value);
    return invalid ? { invalidValue: { value: control.value } } : null;
  };
}
