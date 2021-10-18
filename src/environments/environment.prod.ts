import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: false,
  baseAuthUrl: 'http://localhost:8080/auth',
  USERS_GET_ALL_URL: '/accounts',
  USERS_GET_URL: '/accounts/',
  BASE_CUSTOMER_URL: 'http://localhost:8080/customer',
  CUSTOMERS_GET_URL: '/me/',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF
};
