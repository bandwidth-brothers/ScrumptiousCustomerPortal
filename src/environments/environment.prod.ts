import { NgxLoggerLevel } from "ngx-logger";
const base_url = 'https://ss-scrumptious-api.com';

export const environment = {
  production: true,
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
