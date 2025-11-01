import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient-border',
  standalone: false,
  template: `<div
    class="h-full w-full bg-linear-to-r from-purple-200 to-indigo-200"
  ></div> `,
  // styleUrl: './gradient-border.component.css'
})
export class GradientBorderComponent {}
