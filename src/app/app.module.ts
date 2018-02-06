import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { ApolloModule } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppComponent } from './app.component'
import { Apollo } from 'apollo-angular/Apollo'
import { GraphQLModule } from './graphql.module'
import { AuthService } from './auth/auth.service'
import { ROUTES } from './app.routes'
import { HomeComponent } from './home/home.component'
import { CallbackComponent } from './callback/callback.component'
import { UserInfo } from './auth/userinfo.service'

@NgModule({
  declarations: [ AppComponent, HomeComponent, CallbackComponent ],
  imports: [ BrowserModule, FormsModule, GraphQLModule, HttpModule, HttpClientModule, RouterModule.forRoot(ROUTES) ],
  providers: [ AuthService, UserInfo ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
