import { Injectable } from '@angular/core'
import { AuthService } from './../auth/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable()
export class UserInfo {
  public username: any
  public email: any
  public roles: any

  constructor (public auth: AuthService, public httpClient: HttpClient) {}

  public getInfo (): void {

    console.log('isAuthenticated?', this.auth.isAuthenticated())
    //console.log('should call  ' + 'http://localhost:3000/api/Users/' + this.auth.getUserId() + '?access_token=' + this.auth.getToken())

    this.httpClient
      .get(environment.restServerUrl + '/Users/' + this.auth.getUserId() + '?access_token=' + this.auth.getToken())
      .subscribe(
        (res) => {
          console.log(res)
          this.username = res['username']
          this.roles = res['roles']
        },
        (err) => {
          console.log('Something went wrong!')
        }
      )
  }
}
