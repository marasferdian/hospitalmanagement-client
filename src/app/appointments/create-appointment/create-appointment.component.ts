import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
import {Router} from '@angular/router';
import {User} from '../../shared/user.model';
import {Appointment} from '../../shared/appointment.model';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  user=new User({});
  medicId: number;
  pacientId: number;
  date: Date;
  createdAppointment=new Appointment({});
  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
  }
  isAuthenticated() {
    return this.restService.isAuthenticated();
  }
  getAuthority()
  {
    this.restService.read(User,'http://localhost:8080/user').then(user =>{this.user=user;}).catch(e =>{console.log(e);});
    return this.user.job;
  }
  isAdmin()
  {
    return this.isAuthenticated() && this.getAuthority()==='ADMIN';
  }
  isSecretary()
  {
    return  this.isAuthenticated() && this.getAuthority()==='SECRETARY';
  }
  isPacient()
  {
    return this.isAuthenticated() && this.getAuthority()==='PACIENT';
  }
  isMedic()
  {
    return this.isAuthenticated() && this.getAuthority()==='MEDIC';
  }
  onCreateAppointment()
  {


    if(this.isAdmin()) {
      this.createdAppointment.medicId = +(this.medicId);
      this.createdAppointment.pacientId = +(this.pacientId);
      this.createdAppointment.date = new Date(this.date);
    }
    else if(this.isPacient())
    {
      this.createdAppointment.medicId = +(this.medicId);
      this.createdAppointment.pacientId =this.user.userId;
      this.createdAppointment.date = new Date(this.date);
    }
    else if(this.isMedic())
    {
      this.createdAppointment.medicId =this.user.userId;
      this.createdAppointment.pacientId =this.pacientId;
      this.createdAppointment.date = new Date(this.date);
    }
    console.log(this.createdAppointment.date);
    console.log(typeof this.createdAppointment.medicId,typeof this.createdAppointment.pacientId,typeof this.createdAppointment.date);
    return this.restService.create(Appointment,'http://localhost:8080/appointment',this.createdAppointment);
  }


}
