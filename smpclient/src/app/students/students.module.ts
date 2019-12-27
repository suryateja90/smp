import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentadmissionComponent } from './studentadmission/studentadmission.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { TabledataComponent } from './tabledata/tabledata.component';
import { CardWrapperComponent } from '../wrappers/card';
import { MatCardModule } from '@angular/material';
import { from } from 'rxjs';
import { MatmodModule } from '../matmod/matmod.module';



@NgModule({
  declarations: [StudentadmissionComponent,
     TabledataComponent,
     CardWrapperComponent,
    ],
  imports: [
    CommonModule,
    FormlyMaterialModule,
    MatmodModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      wrappers: [{name: 'card', component: CardWrapperComponent}]
    }),
  ],
  exports: [StudentadmissionComponent,
    CardWrapperComponent,
    TabledataComponent]
})
export class StudentsModule { }
