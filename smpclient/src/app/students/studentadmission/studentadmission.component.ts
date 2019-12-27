import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-studentadmission',
  templateUrl: './studentadmission.component.html',
  styleUrls: ['./studentadmission.component.scss']
})
export class StudentadmissionComponent implements OnInit{

  academicYears;
  constructor () {

  }

  ngOnInit() {

    this.academicYears = [2020, 2019, 2018, 2017];

  }
}
