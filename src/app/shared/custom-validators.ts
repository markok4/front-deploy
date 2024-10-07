import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static specialCharacter: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    const valid = regex.test(control.value);
    return valid ? null : { specialCharacter: true };
  };
}
