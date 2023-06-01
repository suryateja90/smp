import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  editData: any = undefined;
  constructor() { }

  addEditData(data: any) {
    this.editData = data;
  }

  getEditData() {
    return this.editData;
  }
}
