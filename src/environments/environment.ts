// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // // apiUrl: 'http://localhost:3001/api',


  // adminApiUrl: 'http://localhost:8084/api',
  // searchApiUrl: 'http://localhost:8081/api',
  // bookingApiUrl: 'http://localhost:8083/api',
  // commonApiUrl: 'http://localhost:8082/api',


  // adminApiUrl: 'http://51.104.32.212:8084/api',
  // searchApiUrl: 'http://51.104.32.212:8083/api',
  // bookingApiUrl: 'http://51.104.32.212:8082/api',
  // commonApiUrl: 'http://51.104.32.212:8081/api',
  // Dev
  
  // adminApiUrl: 'http://localhost:49563/api',
  // searchApiUrl: 'http://localhost:49562/api',
  // bookingApiUrl: 'http://localhost:49564/api',
  // commonApiUrl: 'http://localhost:49561/api',

  adminApiUrl: 'https://admin-bookingengine.azurewebsites.net/api',
   searchApiUrl: 'https://flightsearchengine.azurewebsites.net/api',
  bookingApiUrl: 'https://bookings-engine.azurewebsites.net/api',
  commonApiUrl: 'https://common-bookingengine.azurewebsites.net/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
