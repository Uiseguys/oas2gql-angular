import { Component, OnInit } from '@angular/core'
import { AuthService } from './../auth/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserInfo } from '../auth/userinfo.service'
import gql, { resetCaches } from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { Observable } from 'apollo-client/util/Observable'
import { Driver, Query } from '../types'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  public drivers: any
  public vehicles: any
  public logs: any

  public drivers_gql: any
  public vehicles_gql: any

  public vehicles_query: any

  public formdata: any = {
    username: '',
    password: ''
  }

  public errorMessage: string

  constructor (
    public auth: AuthService,
    public httpClient: HttpClient,
    public userinfo: UserInfo,
    public apollo: Apollo
  ) {
    console.log('userinfo', userinfo)
    if (this.auth.isAuthenticated()) {
      this.getRestData()
      this.getGqlData()
    }
  }

  ngOnInit () {
    this.userinfo.getInfo()
  }

  login() {
    console.log(this.formdata)

    this.errorMessage = null

    this.auth.login(this.formdata).then(res => {
      this.userinfo.getInfo()
      this.getRestData()
      this.getGqlData()
    }, error => {

      try {
        this.errorMessage = error.error.error.message || 'something went wrong'
        console.log(this.errorMessage)
      } catch(e) {
        this.errorMessage = 'could not login'
        console.log(this.errorMessage)
      }
      
    })
  }

  getRestData() {
    this.drivers = this.httpClient.get(environment.restServerUrl + '/Drivers?access_token=' + this.auth.getToken())

    this.vehicles = this.httpClient.get(environment.restServerUrl + '/Vehicles?access_token=' + this.auth.getToken())

    this.logs = this.httpClient.get(environment.restServerUrl + '/Logs?access_token=' + this.auth.getToken())
  }

  getGqlData() {
    this.apollo
      .watchQuery<Query>({
        query: gql`
          {
            getAllDrivers {
              id
              name
            }
          }
        `
      })
      .valueChanges.subscribe(
        (result) => {
          this.drivers_gql = { data: result.data.getAllDrivers }
        },
        (error) => {
          console.log(error.message || error)
          this.drivers_gql = { error }
        }
      )

    this.apollo
      .watchQuery<Query>({
        query: gql`
          {
            getAllVehicles {
              id
              name
              type
            }
          }
        `
      })
      .valueChanges.subscribe(
        (result) => {
          this.vehicles_gql = { data: result.data.getAllVehicles }
        },
        (error) => {
          console.log(error.message || error)
          this.vehicles_gql = { error }
        }
      )
  }
}
