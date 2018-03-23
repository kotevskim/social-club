import { UserManagementService } from './../core/user-management.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  uid: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService
  ) {}

  ngOnInit() {
    const activeUser: User = this.userService.getCurrentUserFromCache().getValue();
      this.sub = this.route.params.subscribe(params => {
          this.uid = params['id'];
      });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
