import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../Services/Authentication/auth.service';

@Component({
  selector: 'app-sidebar-actions',
  standalone: false,
  templateUrl: './sidebar-actions.component.html',
  styleUrl: './sidebar-actions.component.css',
})
export class SidebarActionsComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();

  username!: string;
  userInitial!: string;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.userInitial = this.username.charAt(0);
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  profile() {
    console.log('profile');
  }
}
