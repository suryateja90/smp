import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
  <mat-card>
  <mat-card-title>{{to.label}}</mat-card-title>
  <mat-list>
 <mat-list-item>{{to.subtitle}}</mat-list-item>
  <mat-divider></mat-divider>
  </mat-list>
  <mat-card-content>
  <ng-container #fieldComponent></ng-container>
  </mat-card-content>
    </mat-card>
  `,
})

export class CardWrapperComponent extends FieldWrapper {
    @ViewChild('fieldComponent', {read: ViewContainerRef, static: true}) fieldComponent: ViewContainerRef;
}