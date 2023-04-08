import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApicallsService } from 'src/app/services/apicalls.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder,private api: ApicallsService) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      emergencyContactName: ['', Validators.required],
      emergencyContactRelationship: ['', Validators.required],
      emergencyContactPhone: ['', Validators.required],
      previousSchoolName: [''],
      previousSchoolAddress: [''],
      previousSchoolRecords: [''],
      medicalConditions: ['']
    });
  }

  onSubmit(): void {
    console.log(this.studentForm?.value);
    debugger;
    this.api.post('students',this.studentForm?.value).subscribe((res) => {
      this.api.showSuccess();
    },
    (err) => {
      console.log(err);
      this.api.showError();
    })
  }
}
