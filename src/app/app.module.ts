import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import {RouterModule, Routes} from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import {AppointmentsService} from './appointments/appointments.service';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { LoginComponent } from './login/login.component';
import {RestService} from './rest.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';

const appRoutes: Routes = [
  {path: 'user', component: UsersComponent},
  {path: '', component: HomeComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'appointments/:id',component:AppointmentComponent},
  {path:'appointments/:id/edit',component:EditAppointmentComponent},
  {path:'login',component:LoginComponent},
  {path:'create-appointment',component:CreateAppointmentComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserComponent,
    AppointmentsComponent,
    AppointmentComponent,
    EditAppointmentComponent,
    LoginComponent,
    CreateAppointmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AppointmentsService,
    RestService,
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
