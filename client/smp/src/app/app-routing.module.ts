import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureRoutingModule } from 'src/features/features-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/features.module').then(m => m.FeaturesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeatureRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
