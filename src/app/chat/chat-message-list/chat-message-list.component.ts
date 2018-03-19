import { MessagingService } from './../shared/messaging.service';
import { UserManagementService } from './../../core/user-management.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';
import { User } from '../../user/shared/user';
import { Message } from '../shared/message';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss']
})
export class ChatMessageListComponent implements OnInit, AfterViewChecked {

  @Input() friendUid: string;
  chatId: string;
  private user: User;
  messages: Message[];
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  constructor(
    private userManagementService: UserManagementService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessagingService
  ) { }

  ngOnInit() {
    this.user = this.userManagementService.getSavedUser().getValue();
    this.messageService.isChatCreated(this.user.uid, this.friendUid).subscribe(snapshot => {
        if (snapshot == null) {
            console.log('Chat has not been created');
            this.chatId = this.messageService.freshlyCreateChatIDEntry(this.user.uid, this.friendUid);
        } else {
            this.chatId = snapshot.key;
        }
        this.messageService.setChatId(this.chatId);
        this.subscribeMessages();
    });
  }

  // The life cycle method is called whenever the view of the component
  // is checked  during change detection.
  ngAfterViewChecked(): void {
    this.scrollToBottom();
    // Also, we detect component changes using the ChangeDetectorRef class.
    // This is required, as we need to force Angular to check for changes to
    // the component because the scroll event runs outside Angular's zone:
    this.cdRef.detectChanges();
  }

  scrollToBottom(): void {
    try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
        console.log('Error');
    }
  }

  subscribeMessages() {
    this.messageService.getMessages(this.chatId)
      .subscribe(
        messages => {
            this.messages = messages;
        });
  }

}
