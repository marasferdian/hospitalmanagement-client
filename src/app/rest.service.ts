import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebResource} from '../app/shared/web-resource.model' ;
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';

interface ConstructorType<T> {
  new(o: any): T;
}

@Injectable()
export class RestService {
  private baseUrl = environment.apiUrl;
  private loginUrl = this.baseUrl + '/login';
  private client = 'hospitalmanagement-client';
  private secret = 'secret';

  public constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private get basicAuth(): string {
    return 'Basic ' + btoa(this.client + ':' + this.secret);
  }

  private get authorizationHeader(): string {
    if (this.isAuthenticated()) {
      return 'Bearer ' + this.cookieService.get('accessToken');
    }
    return this.basicAuth;
  }

  private get loginHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': this.basicAuth
    });
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authorizationHeader
    });
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check('accessToken');
  }

  public login(username: string, password: string): Promise<any> {
    return this.http.post(this.loginUrl, 'grant_type=password&username=' + username + '&password=' + password,
      {headers: this.loginHeaders}).toPromise()
      .then((o: any) => {
        this.cookieService.set('accessToken', o['access_token'], o['expires_in']);
      });
  }

  public logout(): Promise<any> {
    return Promise.resolve(this.cookieService.delete('accessToken'));
  }

  public readRoot(): Promise<WebResource> {
    return this.read(WebResource, this.baseUrl);
  }

  public read<T>(type: ConstructorType<T>, url: string): Promise<T> {
    return this.http.get(url, {headers: this.headers}).toPromise()
      .then(o => new type(o));
  }

  public readArray<T>(type: ConstructorType<T>, url: string): Promise<T[]> {
    return this.http.get(url, {headers: this.headers}).toPromise()
      .then((o: any[]) => {
        const ret: T[] = [];
        for (const x of o) {
          ret.push(new type(x));
        }
        return ret;
      });
  }

  public create<T>(type: ConstructorType<T>, url: string, object: any): Promise<T> {
    return this.http.post(url, object, {headers: this.headers}).toPromise()
      .then(o => new type(o));
  }

  public update<T>(type: ConstructorType<T>, url: string, object: any): Promise<T> {
    return this.http.put(url, object, {headers: this.headers}).toPromise()
      .then(o => new type(o));
  }

  public delete(url: string): Promise<void> {
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {});
  }
}
