import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  imports: [TranslatePipe],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
    translationService = inject(TranslationService);

}
