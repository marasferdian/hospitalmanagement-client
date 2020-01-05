import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user.model';
import {RestService} from '../../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user=new User({});
  constructor(private restService: RestService,private router:Router) {

  }

  ngOnInit() {
    this.restService.read(User, 'http://localhost:8080/user').
    then(user => {this.user = user; } ).
    catch(e => console.log(e));
  }
  isAuthenticated()
  {
    return this.restService.isAuthenticated();
  }
  onClickLogin()
  {
    this.router.navigate(['/login']);
  }
  onClickLogout()
  {
    this.restService.logout();
  }



}
