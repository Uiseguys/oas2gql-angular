import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment'

// GraphiQL: https://launchpad.graphql.com/1jzxrj179
const uri = environment.graphqlServerUrl;
// const uri = 'http://localhost:4000/graphql';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {

    const http = httpLink.create({uri})
    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('access_token');
      // console.log('local storage token', token)
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          'X-Access-Token': token,
          //authorization: token ? `Bearer ${token}` : null,
        }
      }
    });

    // create Apollo
    apollo.create({
      link: auth.concat(http),
      //httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}