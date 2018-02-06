import { Injectable, Inject } from '@angular/core'
import { Router } from '@angular/router'
import 'rxjs/add/operator/filter'
import { DOCUMENT } from '@angular/platform-browser'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Apollo } from 'apollo-angular/Apollo';

@Injectable()
export class AuthService {
  constructor (public router: Router, public httpClient: HttpClient, public apollo: Apollo) {}

  public login ({ username = 'test', password = 'test' }): any {

    const p = new Promise((result, reject) => {
      this.httpClient
      .post(
        environment.restServerUrl + '/Users/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .subscribe(
        (authResult) => {
          this.handleAuthentication(authResult)
          result(authResult)
        },
        (error) => {
          // console.log('error', error)
          reject(error)
        }
      )
    })

    return p

   
  }

  public handleAuthentication (authResult): void {
    if (authResult && authResult.id) {
      this.setSession(authResult)
      this.router.navigate([ '/home' ])
    } else {
      console.log('smth wrong with auth result')
    }

    // this.auth0.parseHash((err, authResult) => {
    //   console.log(authResult)
    // if (authResult && authResult.accessToken && authResult.idToken) {
    //   this.setSession(authResult)
    //   this.router.navigate([ '/home' ])
    // } else if (err) {
    //   this.router.navigate([ '/home' ])
    //   console.log(err)
    //   alert(`Error: ${err.error}. Check the console for further details.`)
    // }
    // })
  }

  private setSession (authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.ttl * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.id)
    localStorage.setItem('userId', authResult.userId)
    localStorage.setItem('expires_at', expiresAt)
  }

  public logout (): void {

    this.apollo.getClient().resetStore()

    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expires_at')
    // Go back to the home route
    this.router.navigate([ '/' ])
  }

  public isAuthenticated (): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  public getToken (): string {
    return localStorage.getItem('access_token')
  }

  public getUserId (): string {
    return localStorage.getItem('userId')
  }
}
