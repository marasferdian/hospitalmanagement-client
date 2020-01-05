import { Component, OnInit } from '@angular/core';
import {AppointmentsService} from '../appointments.service';
import {ActivatedRoute} from '@angular/router';
import {Appointment} from '../../shared/appointment.model';
import {RestService} from '../../rest.service';
import {User} from '../../shared/user.model';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  appointment= new Appointment({});
  updatedAppointment=new Appointment({});
  user=new User({});
  newDate:Date;
  newMedicId:number;
  newPacientId:number;
  constructor(private appointmentsService: AppointmentsService, private route: ActivatedRoute,private restService:RestService) { }

  ngOnInit() {
    this.appointment = this.appointmentsService.getAppointment(this.route.snapshot.params['id']);
  }
  getAuthority()
  {
    this.restService.read(User,'http://localhost:8080/user').then(user =>{this.user=user;}).catch(e =>{console.log(e);});
    return this.user.job;
  }
  isAdmin()
  {
    return (this.getAuthority()==='ADMIN');
  }
  onClickSubmit()
  {
    this.updatedAppointment.date=new Date(this.newDate);
    this.updatedAppointment.medicId= +(this.newMedicId);
    this.updatedAppointment.pacientId= +(this.newPacientId);
    console.log("updating"+this.updatedAppointment.date);
    return this.restService.update(Appointment,'http://localhost:8080/appointments/'+this.route.snapshot.params['/id'],this.updatedAppointment);
  }



}
