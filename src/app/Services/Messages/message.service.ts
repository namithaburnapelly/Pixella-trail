import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment.prod';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { toast } from 'ngx-sonner';
import { ChatHistory } from '../../Models/chat.model';
import { Message } from '../../Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private chats_url = environment.chatsUrl;
  private http = inject(HttpClient);
  private chats = new Map<string, Message[]>();

  private selectedChatId = new BehaviorSubject<string | null>(null);
  private refreshChats = new BehaviorSubject<void>(undefined);

  chatTitles$ = this.refreshChats.pipe(
    tap(() => console.log('fetching chats')),
    switchMap(() =>
      this.http.get<ChatHistory[]>(this.chats_url).pipe(
        map((result) => ({ result, loading: false })),
        startWith({ result: null, loading: true }),
        catchError((error) => {
          console.error(error);
          toast.error('Unable to load chat history', {
            duration: Number.POSITIVE_INFINITY,
          });
          return of({
            result: null,
            loading: false,
            error: true,
          });
        }),
        finalize(() => console.log('fetching completed'))
      )
    ),
    shareReplay(1)
  );

  messages$ = this.selectedChatId.pipe(
    switchMap((chatId) => {
      if (!chatId) {
        return of({ result: null, loading: false });
      }

      // Cache check
      if (this.chats.has(chatId)) {
        console.log(this.chats.get(chatId), 'cached messages');
        return of({
          result: this.chats.get(chatId),
          loading: false,
        });
      }

      console.log('Fetching messages');
      // Fetch the chats
      return this.http.get<Message[]>(`${this.chats_url}/${chatId}`).pipe(
        tap((messages) => {
          this.chats.set(chatId, messages);
          console.log(messages);
        }),
        map((messages) => ({ result: messages, loading: false })),
        startWith({ result: null, loading: true }),
        catchError((error) => {
          console.error(error);
          return of({
            result: null,
            loading: false,
            error: true,
          });
        }),
        finalize(() => console.log('Fetch messages completed'))
      );
    }),
    shareReplay(1)
  );

  refreshChatTitles() {
    this.refreshChats.next();
  }

  setCurrentChatId(chatId: string) {
    this.selectedChatId.next(chatId);
  }
}
