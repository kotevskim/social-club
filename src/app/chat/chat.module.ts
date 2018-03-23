import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatMessageFormComponent } from './chat-message-form/chat-message-form.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComponent } from './chat.component';
import { MessagingService } from './shared/messaging.service';

@NgModule({
  imports: [
    ChatRoutingModule,
    // CoreModule,
    SharedModule.forRoot()
  ],
  declarations: [
    ChatComponent,
    ChatMessageListComponent,
    ChatMessageFormComponent,
    ChatMessageComponent
  ],
  providers: [MessagingService]
})
export class ChatModule { }
