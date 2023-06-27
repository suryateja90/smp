import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApicallsService } from 'src/app/services/apicalls.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  staffForm!: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder, private location: Location,private api: ApicallsService) { }

  ngOnInit(): void {
    this.staffForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get form() {
    return this.staffForm.controls;
  }


  onSubmit() {
    if (this.staffForm.invalid) {
      // Stop here if the form is invalid
      return;
    }

    // Submit the form data
    console.log(this.staffForm.value);
    this.api.post('staff', this.staffForm?.value).subscribe(
      (res) => {
        this.api.showSuccess();
      },
      (error) => {
        console.error(error);
        this.api.showError();
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
