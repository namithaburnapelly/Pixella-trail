import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../Services/Authentication/auth.service';

@Component({
  selector: 'app-sidebar-actions',
  standalone: false,
  templateUrl: './sidebar-actions.component.html',
  styleUrl: './sidebar-actions.component.css',
})
export class SidebarActionsComponent implements OnInit {
  username!: string;
  private authService = inject(AuthService);
  @Output() toggle = new EventEmitter<void>();

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  profile() {
    console.log('profile');
  }
}
