import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment.prod';
import {
  BehaviorSubject,
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { toast } from 'ngx-sonner';
import { ChatMetaData } from '../../Models/chat.model';
import { Message, MessageInChatResponse } from '../../Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private chats_url = environment.chatsUrl;
  private messages_url = environment.messageUrl;

  private http = inject(HttpClient);

  private chats = new Map<string, Message[]>();
  private tempPromptForNewChat: Message | null = null;

  private selectedChatId = new BehaviorSubject<string | null>(null);
  private refreshChats = new BehaviorSubject<void>(undefined);

  private modelThinking = new BehaviorSubject<boolean>(false);
  modelThinking$ = this.modelThinking.asObservable();

  constructor() {}

  chatTitles$ = this.refreshChats.pipe(
    // tap(() => console.log('fetching chats')),
    switchMap(() =>
      this.http.get<ChatMetaData[]>(this.chats_url).pipe(
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
        })
        // finalize(() => console.log('fetching completed'))
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
          result: this.chats.get(chatId) ?? [],
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
          toast.error('Unable to load Messages, Try refreshing.', {
            duration: Number.POSITIVE_INFINITY,
          });
          return of({
            result: null,
            loading: false,
            error: error,
          });
        }),
        finalize(() => console.log('Fetch messages completed'))
      );
    }),
    shareReplay(1)
  );

  private addTempUserMessage(chatId: string | null, prompt: string): Message {
    const TempUserMessage: Message = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: [prompt],
      chatId: chatId ?? '',
    };
    if (chatId) {
      const exisitng = this.chats.get(chatId) ?? [];
      const updated = [...exisitng, TempUserMessage];

      this.chats.set(chatId, updated);
      this.selectedChatId.next(chatId);
    }

    return TempUserMessage;
  }

  refreshChatTitles() {
    this.refreshChats.next();
  }

  getCurrentChatIdMessages(chatId: string) {
    this.selectedChatId.next(chatId);
  }

  clearSelectedChat() {
    this.selectedChatId.next(null);
  }

  sendMessage(
    userPrompt: string
  ): Observable<MessageInChatResponse | { result: null; error: boolean }> {
    return this.selectedChatId.pipe(
      take(1),
      switchMap((chatId) => {
        if (!chatId) {
          return this.http
            .post<MessageInChatResponse>(this.messages_url, { userPrompt })
            .pipe(
              tap((response) => {
                if (response.chat) {
                  const newChatId = response.chat.id;
                  this.chats.set(newChatId, response.messages);
                  this.selectedChatId.next(newChatId);
                }
                this.refreshChatTitles();
                console.log(response, 'from new chat');
              })
            );
        }
        // chatId exists -> append user message
        const temp = this.addTempUserMessage(chatId, userPrompt);

        // loading state
        this.modelThinking.next(true);

        return this.http
          .post<MessageInChatResponse>(`${this.messages_url}/${chatId}`, {
            userPrompt,
          })
          .pipe(
            tap((serverResponse) => {
              let cached = (this.chats.get(chatId) ?? []).filter(
                (m) => m.id !== temp.id
              );

              // append real messages from server
              const updatedMessages = [...cached, ...serverResponse.messages];
              this.chats.set(chatId, updatedMessages);

              // trigger UI update
              this.selectedChatId.next(chatId);
              console.log(this.chats);
            }),
            catchError((error) => {
              console.error(error);
              toast.error('Internal server error, Try again.', {
                duration: Number.POSITIVE_INFINITY,
              });
              return of({
                result: null,
                error: true,
              });
            }),
            finalize(() => this.modelThinking.next(false))
          );
      })
    );
  }
}
