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
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      dateOfJoining: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get form() {
    return this.staffForm.controls;
  }

  sanitizeMobileInput(input: EventTarget | null) {
    if (input instanceof HTMLInputElement) {
      const sanitizedValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
      input.value = sanitizedValue; // Update the input value
    }
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
