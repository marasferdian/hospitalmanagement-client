import {WebResource} from './web-resource.model';

export class Appointment extends WebResource{
  public appointmentId: any;
  public pacientId: any;
  public medicId: any;
  public date: Date;

  constructor(o:any) {
    super(o);
    this.appointmentId = o.appointmentId;
    this.pacientId = o.pacientId;
    this.medicId =o.medicId;
    this.date = new Date(o.date);
  }


}
