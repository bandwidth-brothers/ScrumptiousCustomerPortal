import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  readonly GENERATE_S3_URL = environment.BASE_AUTH_URL + '/auth/s3-secure-url'

  constructor(private http: HttpClient) { }

  getSecureURL(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.get<any>(this.GENERATE_S3_URL, options)
  }

  insertImageToBucket(url: string, data: Blob) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'skip-auth': 'true'
      }),
    };
    console.log(options.headers)

    return this.http.put<void>(url, data, options)
  }
}
