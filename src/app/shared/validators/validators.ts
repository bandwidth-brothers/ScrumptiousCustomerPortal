import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function trimStringLength(
    minLength: number,
    maxLength?: number
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!!control.value) {
            const toCheck = control.value.trim();

            if (toCheck.length < minLength) {
                return { stringUnderMin: true };
            }
            if (!!maxLength && toCheck.length > maxLength) {
                return { stringOverMax: true };
            }
        }
        return null;
    };
}
