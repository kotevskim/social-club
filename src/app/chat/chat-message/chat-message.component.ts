import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../../core/user-management.service';
import { Message } from '../shared/message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;

  uid: string;

  constructor(private userService: UserManagementService) {
  }

  ngOnInit() {
      this.uid = this.userService.getSavedUser().getValue().uid;
  }

  isReceiver(message: Message) {
      return this.uid === message.receiverUid;
  }

  isSender(message: Message) {
      return this.uid === message.senderUid;
  }

}
