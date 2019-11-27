import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { MobxAngularModule } from 'mobx-angular';
// import {
//     AgmCoreModule,
// } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import MainService from './services/MainService';


@NgModule ( {
    imports     : [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule,
        MobxAngularModule,
        AppRoutingModule,
        // AgmCoreModule.forRoot ( {
        //     apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        // } ),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
    
    ],
    exports     : [ MobxAngularModule ],
    providers   : [ MainService, MobxAngularModule ],
    bootstrap   : [ AppComponent ],
} )
export class AppModule {
}
