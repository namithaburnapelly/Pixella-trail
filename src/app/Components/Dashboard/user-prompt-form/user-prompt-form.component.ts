import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../Services/Messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-prompt-form',
  standalone: false,
  templateUrl: './user-prompt-form.component.html',
  styleUrl: './user-prompt-form.component.css',
})
export class UserPromptFormComponent {
  @Input() currentChatId!: string | null;
  userForm: FormGroup;
  isOverFlowing: boolean = false;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor() {
    this.userForm = this.fb.group({
      prompt: [''],
    });
  }

  sendMessage() {
    const userMessage = this.userForm.get('prompt')?.value?.trim();
    if (!userMessage) return;

    this.userForm.reset();
    this.isOverFlowing = false;
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) (textarea as HTMLTextAreaElement).style.height = 'auto';
    });

    this.messageService.sendMessage(userMessage).subscribe((response) => {
      if (!this.currentChatId && 'chat' in response && response.chat?.id) {
        const newChatId = response.chat.id;
        this.router.navigate(['/chat', newChatId]);
      }
    });
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';

    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 160;
    this.isOverFlowing = scrollHeight > maxHeight;
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.userForm.valid && this.userForm.get('prompt')?.value?.trim()) {
        this.sendMessage();
      }
    }
  }
}
