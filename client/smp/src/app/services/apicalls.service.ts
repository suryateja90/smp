import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  private baseUrl: string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showError() {
    this.snackBar.open('Error message', 'Close', { duration: 2000, panelClass: ['my-custom-snackbar', 'mat-warn'] });
  }

  showSuccess() {
    this.snackBar.open('Success message', 'Close', { duration: 2000, panelClass: ['my-custom-snackbar', 'mat-primary'] });
  }
  post(endpoint: string, data: any): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.post(url, data, this.getHeaders());
  }

  get(endpoint: string): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.get(url, this.getHeaders());
  }

  put(endpoint: string, data: any): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.put(url, data, this.getHeaders());
  }

  delete(endpoint: string): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.delete(url, this.getHeaders());
  }

  private getHeaders(): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return { headers };
  }
}
