import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegisterComponent } from './student-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './student-list/student-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentViewComponent } from './studet-view/student-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MarksComponent } from './marks/marks.component';
import { StaffComponent } from './staff/staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';


@NgModule({
  declarations: [
    StudentRegisterComponent,
    StudentListComponent,
    StudentViewComponent,
    MarksComponent,
    StaffComponent,
    AddStaffComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class FeaturesModule { }
