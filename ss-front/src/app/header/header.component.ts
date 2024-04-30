import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import 'bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavbarOpen = false;
  isLoggedIn = false;
  isAdminPage: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  logout(): void {

  }

  isCurrentTab(tabPath: string): boolean {
    return this.router.isActive(tabPath, true);
  }

}
