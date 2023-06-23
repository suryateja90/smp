import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { LayoutComponent } from './layout/layout.component';
import { MarksComponent } from './marks/marks.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRegisterComponent } from './student-register.component';

const routes: Routes = [
  { path: 'reg', component: StudentRegisterComponent },
  { path: 'list', component: StudentListComponent},
  { path: 'edit', component: StudentRegisterComponent},
  { path: 'marks', component: MarksComponent},
  { path: 'addstaff', component: AddStaffComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }