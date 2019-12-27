import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.scss']
})
export class TabledataComponent implements OnInit {

  public empData;
  
  constructor() {

   }

  ngOnInit() {
    this.empData = [
      {
        "id": "1",
        "firstName": "Tom",
        "lastName": "Cruise"
      },
      {
        "id": "2",
        "firstName": "Maria",
        "lastName": "Sharapova"
      },
      {
        "id": "3",
        "firstName": "James",
        "lastName": "Bond"
      }
    ]
  }


  addKey(baadko) {
   debugger;
  };


}
