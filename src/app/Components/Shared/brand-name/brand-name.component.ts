import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-name',
  standalone: false,
  template: `
    <div
      class="font-brand-font text-4xl md:text-4xl/5 font-extrabold select-none"
    >
      Pixella
    </div>
  `,
  // styleUrl: './brand-name.component.css',
})
export class BrandNameComponent {}
