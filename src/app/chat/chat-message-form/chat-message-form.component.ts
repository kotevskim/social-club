import { MessagingService } from './../shared/messaging.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../../core/user-management.service';
import { Message } from '../shared/message';

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
    this.uid = this.userService.getSavedUser().getValue().uid;
  }

  sendMessage() {
    const message: Message = new Message(this.newMessage, this.uid, this.friendUid, Date.now());
    this.messageService.createNewMessage(message);
  }

}
