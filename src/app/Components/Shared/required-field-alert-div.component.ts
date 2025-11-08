import { Component } from '@angular/core';

@Component({
  selector: 'app-required-field-alert-div',
  standalone: false,
  template: `
    <div
      class="absolute -translate-x-1/2 flex items-center gap-x-1 w-full bg-white mt-1 p-2 md:py-2.5 lg:py-2.5 border border-muted-foreground min-w-max rounded"
    >
      <!-- Triangle Arrow -->
      <svg
        id="triangle"
        viewBox="0 0 100 100"
        class="absolute -top-3 left-8 transform -translate-x-1/2 w-3 h-3"
      >
        <polygon
          points="50 15, 100 100, 0 100"
          fill="white"
          class="stroke-[7px] stroke-muted-foreground"
        />
      </svg>

      <lucide-icon
        name="circle-alert"
        class="h-4 w-4 text-yellow-500"
      ></lucide-icon>
      <p class="text-sm">Please fill out this field.</p>
    </div>
  `,
  // styleUrl: './required-field-alert-div.component.css'
})
export class RequiredFieldAlertDivComponent {}
