import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { USER_DETAILS_CHILD, CHAT_MESSAGES_CHILD, MESSAGE_DETAILS_CHILD } from '../../constants/database-constants';
import { Message } from './message';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessagingService {

  private chatId: string;

  constructor(
    private fireDb: AngularFireDatabase
  ) { }

  freshlyCreateChatIDEntry(uid: string, friendUid: string): string {
    const key = this.fireDb.createPushId();
    this.fireDb.object(`${USER_DETAILS_CHILD}/${CHAT_MESSAGES_CHILD}/${uid}/${friendUid}`).set({key: key});
    this.fireDb.object(`${USER_DETAILS_CHILD}/${CHAT_MESSAGES_CHILD}/${friendUid}/${uid}`).set({key: key});
    return key;
  }

  createNewMessage(newMessage: Message) {
    const messageKey = this.fireDb.createPushId();
    this.fireDb.object(`${MESSAGE_DETAILS_CHILD}/${this.chatId}/${messageKey}`)
      .set(newMessage).catch(error => {
      console.log(error);
    });
  }

  isChatCreated(uid: string, friendUid: string): Observable<any> {
    return this.fireDb.object(`${USER_DETAILS_CHILD}/${CHAT_MESSAGES_CHILD}/${uid}/${friendUid}`)
      .valueChanges();
  }

  getMessages(chatId: string): Observable<Message[]> {
    return this.fireDb.list<Message>(`${MESSAGE_DETAILS_CHILD}/${chatId}`).valueChanges();
  }

  setChatId(id: string) {
    this.chatId = id;
  }

}
