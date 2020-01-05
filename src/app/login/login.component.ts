import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string ='';
  password: string = '';

  constructor(private restService: RestService,private router:Router) { }

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return this.restService.isAuthenticated();
  }

  login(): void {
    this.restService.login(this.username, this.password).catch(e => LoginComponent.handle(e));
    this.password = '';
  }

  logout(): void {
    this.restService.logout().catch(e => LoginComponent.handle(e));
  }
  onLoadUser()
  {
    this.router.navigate(['/user']);
  }

  static handle(e: any): void {
    console.log(e);
  }
}
