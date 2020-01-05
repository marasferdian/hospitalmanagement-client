import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.restService.isAuthenticated();
  }
  onLoadUser() {
    this.router.navigate(['/user']);
  }
  onClickLogin() {
    this.router.navigate(['/login']);
  }
  onClickLogout() {
    this.restService.logout();
  }
}
