import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MessageService } from '../../../Services/Messages/message.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = false;
  private chatService = inject(MessageService);

  chatTitles = this.chatService.chatTitles$;

  ngOnInit(): void {
    this.updateSidebarVisibility();
    this.chatService.refreshChatTitles();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.updateSidebarVisibility();
  }

  updateSidebarVisibility(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) this.isSidebarVisible = false;
    else this.isSidebarVisible = true;
  }
}
