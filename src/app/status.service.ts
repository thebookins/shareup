import { Injectable } from '@angular/core';
import { Status } from './status';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl = '/api/status';

  constructor (private http: HttpClient) {}

  getStatus() {
    return this.http.get<Status>(this.statusUrl);
  }
}
