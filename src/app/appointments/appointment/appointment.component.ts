import { Component, OnInit } from '@angular/core';
import {Appointment} from '../../shared/appointment.model';
import {AppointmentsService} from '../appointments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../rest.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointment: Appointment;
  constructor(private appointmentsService: AppointmentsService, private route: ActivatedRoute, private router: Router,private restService:RestService) {

  }

  ngOnInit() {

    this.restService.read(Appointment,'http://localhost:8080/appointments/'+(this.route.snapshot.params['id'])).
    then(appointment =>{this.appointment = appointment}).catch(e =>{console.log(e);});
    console.log(this.appointment);
  }

  onClickEdit(appointmentId: any) {
    this.router.navigate(['/appointments/' + appointmentId + '/edit']);
  }

}
