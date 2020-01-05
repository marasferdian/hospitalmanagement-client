import {RestService} from '../rest.service';
import {Appointment} from '../shared/appointment.model';

export class AppointmentsService {

  constructor(private restService:RestService)
  {

  }
  appointments: Appointment[]=[];

  async getAppointments() {

     return this.restService.readArray(Appointment, 'http://localhost:8080/appointments');
  }

  getAppointment(appointmentId: number) {
    const appointment = this.appointments.find(
      (s) => {
        return s.appointmentId === appointmentId;
      }
    );
    return appointment;
  }
  updateAppointment(appointmentId: any, appointmentInfo: {medicId: any, date: Date}) {
    const appointment = this.appointments.find(
      (s) => {
        return s.appointmentId === appointmentId;
      }
    );
    if (appointment) {
      appointment.medicId = appointmentInfo.medicId;
      appointment.date = appointmentInfo.date;
    }
  }


}
