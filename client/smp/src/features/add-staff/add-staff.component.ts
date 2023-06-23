import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  staffForm!: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.staffForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
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
  }

  goBack() {
    this.location.back();
  }
}
