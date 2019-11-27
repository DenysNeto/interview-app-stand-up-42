import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
} from '@angular/material';
import { ModalAddComponent } from './modal/modal-add/modal-add.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';
import { ModalDescriptionComponent } from './modal/modal-description/modal-description.component';
import { MobxAngularModule } from 'mobx-angular';
import { SpinnerComponent } from './modal/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        NgbDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        MobxAngularModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
    
    ],
  declarations: [
    SidebarComponent,
    ModalAddComponent,
    ModalDeleteComponent,
    ModalDescriptionComponent,
    SpinnerComponent
  ],
    exports: [
        SidebarComponent,
        ModalAddComponent,
        ModalDeleteComponent,
        ModalDescriptionComponent,
    ],
})
export class ComponentsModule { }
