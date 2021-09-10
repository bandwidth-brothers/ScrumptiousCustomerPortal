// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  BASE_USER_URL: 'http://localhost:9040',
  USERS_GET_ALL_URL: '/accounts',
  USERS_GET_URL: '/accounts/',
  BASE_CUSTOMER_URL: 'http://localhost:9042/api/v0.1',
  CUSTOMERS_GET_ALL_URL: '/customers',
  CUSTOMERS_GET_URL: '/customers/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
