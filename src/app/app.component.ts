import { Component, isDevMode } from '@angular/core';
import { AuthService } from './auth/auth.service';

// import gql from 'graphql-tag';
// import { Apollo } from 'apollo-angular';
// import { Observable } from 'apollo-client/util/Observable';
// import { Driver, Query } from './types';
// import { map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'app';

	constructor(public auth: AuthService) {

		if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }

		// this.auth.handleAuthentication();

	}
	/*
	ngOnInit() {

		

		this.drivers = this.apollo
			.watchQuery<Query>({
				query: gql`
					query getAllDrivers {
						getAllDrivers {
              _id
              firstName
							lastName
						}
					}
				`
			})
      .valueChanges.pipe(map((result) => result.data.getAllDrivers));
      
      this.vehicles = this.apollo.watchQuery<Query>({
        query: gql`
        {
          getAllVehicles {
            _id
            name
          }
        }
        `
      })
      .valueChanges.pipe(map((result) => result.data.getAllVehicles));
	}
	*/
}
