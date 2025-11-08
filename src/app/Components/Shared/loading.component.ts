import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,
  template: `<div class="animate-spin">
    <lucide-icon name="loader" class="w-6 h-6 lg:h-8 lg:w-8"></lucide-icon>
  </div> `,
  // styleUrl: './loading.component.css'
})
export class LoadingComponent {}
