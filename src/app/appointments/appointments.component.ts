import { Component, OnInit } from '@angular/core';
import {Appointment} from '../shared/appointment.model';
import {AppointmentsService} from './appointments.service';
import {Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  public  appointments = [];
  constructor(private appointmentsService: AppointmentsService, private router: Router, private restService: RestService) {
  }

  ngOnInit() {
    this.appointmentsService.getAppointments().then(appointments=>{this.appointments = appointments;});
  }

  onClickAppointment(id: any) {
    this.router.navigate(['/appointments/', id]);
  }
  onCreateAppointment()
  {
    this.router.navigate(['/create-appointment']);
  }
}
