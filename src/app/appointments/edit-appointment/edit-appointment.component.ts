import { Component, OnInit } from '@angular/core';
import {AppointmentsService} from '../appointments.service';
import {ActivatedRoute} from '@angular/router';
import {Appointment} from '../../shared/appointment.model';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  appointment: Appointment;
  constructor(private appointmentsService: AppointmentsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.appointment = this.appointmentsService.getAppointment(this.route.snapshot.params['id']);
  }

}
