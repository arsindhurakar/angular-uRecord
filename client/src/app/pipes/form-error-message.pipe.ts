import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formErrorMessage',
})
export class FormErrorMessagePipe implements PipeTransform {
  transform(errors: [], label: string): string {
    let errorMessage: string = '';
    let errorTypes = errors && Object.keys(errors);

    errorTypes &&
      errorTypes.forEach((errorType) => {
        switch (errorType) {
          case 'required':
            errorMessage = `${label} is required.`;
            break;

          case 'pattern':
            errorMessage = `Invalid ${label}.`;
            break;

          case 'minlength':
            errorMessage = `${label} must be at least ${errors['minlength'].requiredLength} characters long.`;
            break;

          case 'invalidValue':
            errorMessage = `${errors['invalidValue'].value} is not a valid name.`;
            break;

          default:
            break;
        }
      });

    return errorMessage;
  }
}
