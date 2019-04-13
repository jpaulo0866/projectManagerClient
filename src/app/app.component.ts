import { Component, OnInit, HostBinding } from '@angular/core';
import { SharedService } from './services/shared.service';
import { FormControl } from '@angular/forms';
import { EventService } from './services/event.service';
import { Themes } from './themes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Constants } from './global/constants';
import { MatDialog, MatSlideToggleChange } from '@angular/material';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PageStatisticsService } from './services/page-statistics.service';
import { ResponseApi } from './model/response.api';
import { DialogService } from './dialog.service';
import { PageStatistic } from './model/pageStatistic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProjectManager';
  loggedUser = false;
  mode = new FormControl('side');
  @HostBinding('class') componentCssClass;
  themes = Themes;
  actualTheme = this.themes[0];
  mostUsedPages: PageStatistic[];
  darkThemeChecked: boolean;

  constructor(private sharedService: SharedService,
              public overlayContainer: OverlayContainer,
              private dialog: MatDialog,
              private router: Router,
              private pageStatistic: PageStatisticsService) {
  }

  ngOnInit(): void {
    this.actualTheme = this.sharedService.cookieService.get(Constants.COOKIE_THEME);
    this.onSetTheme();
    this.sharedService.loggerUser.subscribe(
      result => {
        this.loggedUser = result;
        if (result) {
          this.getMostUsedAccess();
        }
      }
    );
    this.getMostUsedAccess();
  }

  onSetTheme() {
    if (!this.actualTheme) {
      this.actualTheme = Constants.THEME_DARK_GLOBAL;
    }

    this.darkThemeChecked = this.actualTheme.includes('dark');
    const classList = this.overlayContainer.getContainerElement().classList;

    if (classList.contains(this.actualTheme)) {
      classList.replace(this.actualTheme, this.actualTheme);
    } else {
      classList.add(this.actualTheme);
    }

    this.componentCssClass = this.actualTheme;
    this.sharedService.cookieService.set(Constants.COOKIE_THEME, this.actualTheme);
  }

  changeTheme(event: MatSlideToggleChange) {
    this.darkThemeChecked = event.checked;
    if (this.darkThemeChecked) {
      this.actualTheme = Constants.THEME_DARK_GLOBAL;
    } else {
      this.actualTheme = Constants.THEME_GLOBAL;
    }
    this.onSetTheme();
  }

  logout() {
    this.sharedService.forceLogout();
  }

  isLoggedUser() {
    return this.sharedService.isLoggedIn();
  }

  userImage() {
    return this.sharedService.user.image || '../../../assets/img/notfound.png';
  }

  showSideMenu() {
    return {
      'content-wrapper': this.isLoggedUser()
    };
  }

  openMyProfile() {
    this.dialog.open(MyProfileComponent);
  }

  getMostUsedAccess() {
    this.pageStatistic.getLastAccess(this.sharedService.user.userId).subscribe((response: ResponseApi) => {
      this.mostUsedPages = response.data;
    });
  }

  menuOutputEvent(menuEvent: any) {
    this.getMostUsedAccess();
  }

  private internalRoute(path: string) {
    this.router.navigate([path]);
  }
}
