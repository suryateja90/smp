import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegisterComponent } from './student-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FeaturesModule { }
