import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { TableListComponent } from '../../table-list/table-list.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule, MatIconModule,
    MatProgressSpinnerModule, MatSortModule,
    
} from '@angular/material';
import { ComponentsModule } from '../../components/components.module';
import { MobxAngularModule } from 'mobx-angular';

@NgModule ( {
    imports: [
        CommonModule,
        RouterModule.forChild ( AdminLayoutRoutes ),
        FormsModule,
        MatSortModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        ComponentsModule,
        MobxAngularModule,
        MatProgressSpinnerModule,
   
    ],
    declarations: [
        TableListComponent,
    ],
} )

export class AdminLayoutModule {
}
