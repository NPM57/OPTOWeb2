import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { LoginService } from '../shared/services/login.service'
import { AuthService } from '../shared/services/auth.service'
import { PAGES_MENU } from './pages.menu';
import { Router } from '@angular/router';


@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService, 
    private loginservice: LoginService,
    private authservice: AuthService, 
    private router: Router ) {
  }

  ngOnInit() {
    var MENU;
     if(screen.width>420){
       MENU = this.loginservice.getMenuRenderByUser();
       this._menuService.updateMenuByRoutes(<Routes>MENU);
     }
     if(screen.width<=420){
       MENU = this.loginservice.getMenuRenderByDevices();
       this._menuService.updateMenuByRoutes(<Routes>MENU); 
     }
  }

  Logout($event){
    this.loginservice.Logout($event);
    this.router.navigate(['/login']);
  }
}
