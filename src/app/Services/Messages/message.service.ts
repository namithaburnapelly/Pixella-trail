import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment.prod';
import {
  BehaviorSubject,
  catchError,
  delay,
  finalize,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { toast } from 'ngx-sonner';
import { ChatHistory } from '../../Models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private chats_url = environment.chatsUrl;
  private http = inject(HttpClient);

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

  refreshChatTitles() {
    this.refreshChats.next();
  }
}
