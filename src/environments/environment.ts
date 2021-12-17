// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from "ngx-logger";




// export const environment = {
//   production: false,
//   BASE_AUTH_URL: 'http://localhost:8000',
//   BASE_RESTAURANT_URL: 'http://localhost:8010',
//   BASE_DRIVER_URL: 'http://localhost:8080/driver',
//   USERS_GET_ALL_URL: '/accounts',
//   USERS_GET_URL: '/accounts/',
//   BASE_CUSTOMERS_URL: 'http://localhost:8020/customers',
//   BASE_ORDERS_URL: 'http://localhost:8030/orders',
//   BASE_NOTIFICATION_URL: 'http://localhost:8080/notification',
//   logLevel: NgxLoggerLevel.TRACE,
//   serverLogLevel: NgxLoggerLevel.OFF
// };

  const base_url = 'http://ss-scrumptious-api.com';

export const environment = {
  production: false,
  BASE_URL: base_url,
  BASE_AUTH_URL: base_url + '/auth',
  BASE_RESTAURANT_URL: base_url,
  BASE_DRIVER_URL: base_url + '/driver',
  USERS_GET_ALL_URL: '/accounts',
  USERS_GET_URL: '/accounts/',
  BASE_CUSTOMERS_URL: base_url + '/customers',
  BASE_ORDERS_URL: base_url + '/orders',
  BASE_NOTIFICATION_URL: base_url + '/notification',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
