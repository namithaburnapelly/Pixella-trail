import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../Services/Messages/message.service';

@Component({
  selector: 'app-chatpanel',
  standalone: false,
  templateUrl: './chatpanel.component.html',
  styleUrl: './chatpanel.component.css',
})
export class ChatpanelComponent implements OnInit {
  currentChatId: string | null = null;

  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  messages$ = this.messageService.messages$;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentChatId = params.get('chatId');
      if (this.currentChatId) {
        this.messageService.setCurrentChatId(this.currentChatId);
      }
    });
  }
}
