import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProfanityFilterService } from './profanity-filter.service';

export function profanityValidator(filterService: ProfanityFilterService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasProfanity = filterService.containsProfanity(control.value);
    
    if (hasProfanity) {
      const detected = filterService.getDetectedTerms(control.value);
      return { 
        profanity: {
          message: 'Linguagem inadequada detectada.',
          terms: detected
        }
      };
    }

    return null;
  };
}
