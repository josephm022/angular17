import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /^[0-9]*$/.test(control.value);
    return isValid ? null : { numeric: { value: control.value } };
  };
}