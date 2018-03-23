import { MessagingService } from './../shared/messaging.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../../core/user-management.service';
import { Message } from '../shared/message';
import { User } from '../../user/shared/user';

@Component({
  selector: 'app-chat-message-form',
  templateUrl: './chat-message-form.component.html',
  styleUrls: ['./chat-message-form.component.scss']
})
export class ChatMessageFormComponent implements OnInit {

  @Input() friendUid: string;
  uid: string;
  newMessage: string;

  constructor(
    private userService: UserManagementService,
    private messageService: MessagingService
  ) {}

  ngOnInit() {
    const activeUser: User = this.userService.getCurrentUserFromCache().getValue();
    this.uid = activeUser.uid;
  }

  sendMessage() {
    const message: Message = new Message(this.newMessage, this.uid, this.friendUid, Date.now());
    this.messageService.createNewMessage(message);
  }

}
