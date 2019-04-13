import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/model/user.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggledMenuEvent = new EventEmitter<boolean>();
  isToggled = false;

  constructor(private sharedService: SharedService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.toggledMenuEvent.subscribe((result) => {
      this.isToggled = result;
    });
  }

  logout() {
    this.sharedService.forceLogout();
  }

  isLoggerUser() {
    return this.sharedService.isLoggedIn();
  }

  userImage() {
    return this.sharedService.user.image || '../../../assets/img/notfound.png';
  }

  toggle() {
    this.eventService.toggledMenu.emit(!this.isToggled);
  }
}
