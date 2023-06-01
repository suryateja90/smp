import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRegisterComponent } from './student-register.component';

const routes: Routes = [
  { path: 'reg', component: StudentRegisterComponent },
  { path: '', component: StudentListComponent},
  { path: 'edit', component: StudentRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }