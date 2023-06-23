import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit, OnDestroy {

  studentForm!: FormGroup;
  mode = 'create';
  stdId: number | undefined;

  constructor(private fb: FormBuilder, private serv: GenericService, private api: ApicallsService, public route: ActivatedRoute, public router: Router) { }

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

    const data = this.serv.getEditData(); // Retrieve the passed data from the navigation state
    if (data) {
      this.stdId = data.id;
      // Map the data into the form group
      Object.keys(data).forEach((key) => {
        this.studentForm.controls[key]?.setValue(data[key]);
      });
      this.mode = 'edit';
    }
  }

  onUpdate(): void {
    let payload = this.studentForm?.value;
    payload.id = this.stdId;
    this.api.put('edit-students', payload).subscribe(
      (res) => {
        this.api.showSuccess();
      },
      (error) => {
        console.error(error);
        this.api.showError();
      }
    );
  }

  onSubmit(): void {
    console.log(this.studentForm?.value);
    this.api.post('students', this.studentForm?.value).subscribe(
      (res) => {
        this.api.showSuccess();
      },
      (error) => {
        console.error(error);
        this.api.showError();
      }
    );
  }

  ngOnDestroy(): void {
    this.serv.addEditData(undefined);
  }
}
