import { Routes } from '@angular/router';
import { TableListComponent } from '../../table-list/table-list.component';

export const AdminLayoutRoutes: Routes = [
    /*    {
            path    : '',
            children: [ {
                path     : 'dashboard',
                component: TableListComponent,
            } ],
        },*/
    // { path: '', component: TableListComponent },
    { path: 'table-list', component: TableListComponent },
    // table-list
];
