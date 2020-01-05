import {WebResource} from './web-resource.model';

export class User extends WebResource {
  public userId: any;
  public username: string;
  public firstName: string;
  public lastName: string;
  public job: string;

  getName(): string {
    return this.firstName + ' ' + this.lastName;
  }
  constructor(o: any) {
    super(o);
    this.userId = o.userId;
    this.username = o.username;
    this.firstName = o.firstName;
    this.lastName = o.lastName;
    this.job = o.job;
  }

}
