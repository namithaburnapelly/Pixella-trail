import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MessageService } from '../../../Services/Messages/message.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarVisible: boolean = true;
  sidebarWidth: number = 280;
  MIN_WIDTH: number = 280;
  MAX_WIDTH: number = 640;
  isResizing: Boolean = false;

  private chatService = inject(MessageService);
  private router = inject(Router);

  chatTitles = this.chatService.chatTitles$;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const windowWidth = (event.target as Window).innerWidth;
    if (windowWidth < 768) {
      this.isSidebarVisible = false;
    } else {
      this.isSidebarVisible = true;
    }
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault();
  }
  ngOnInit(): void {
    this.chatService.refreshChatTitles();

    // drag sidebar
    document.addEventListener('mousemove', this.resizeHandler);
    document.addEventListener('mouseup', this.stopResizeHandler);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth < 768) {
          this.isSidebarVisible = false;
        } else {
          this.isSidebarVisible = true;
        }
      });
  }

  resizeHandler = (event: MouseEvent) => {
    if (!this.isResizing) return;

    const newWidth = event.clientX;
    const windowWidth = window.innerWidth;

    if (
      newWidth > this.MIN_WIDTH &&
      newWidth < this.MAX_WIDTH &&
      newWidth < windowWidth - 50 // Ensure sidebar doesn't exceed screen width
    ) {
      this.sidebarWidth = newWidth;
    }
  };

  stopResizeHandler = () => {
    this.isResizing = false;
  };

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarWidth = this.isSidebarVisible ? 280 : 80;
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.resizeHandler);
    document.removeEventListener('mouseup', this.stopResizeHandler);
  }
}
