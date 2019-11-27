import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import MainService from '../services/MainService';
import { ItemPayload } from '../../interfaces/PayloadTypes';
import { computed, observable } from 'mobx-angular';
import { action, reaction, toJS } from 'mobx';
import { MatSort, SortDirection } from '@angular/material';

@Component ( {
    selector       : 'app-table-list',
    templateUrl    : './table-list.component.html',
    styleUrls      : [ './table-list.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class TableListComponent implements OnInit {
    
    @ViewChild ( MatSort, { static: false } ) sort: MatSort;
    
    @observable isFetched: boolean                                                      = false;
    @observable currentSort: { active: 'name' | 'date' | '', direction: SortDirection } = {
        active: '', direction: '',
    };
    
    @observable isSortingActive: boolean    = false;
    @observable _sorted_list: ItemPayload[] = [];
    @observable reset: boolean              = false;
    @Input ( 'matSortDirection' ) direction;
    
    @computed get sorted_list () {
        return toJS ( this._sorted_list );
    }
    
    constructor ( private mainService: MainService ) {
    
    }
    
    getStringAppearence ( value: string ) {
        if ( value.length > 20 ) {
            return `${value.substring ( 0, 20 )}...`;
        }
        return value;
    }
    
    @action sortDirection () {
        return !this.isSortingActive && '';
        
    }
    
    ngOnInit () {
        this.mainService.getAllItems ().then ( () => {
            this._sorted_list = [ ...this.mainService.itemsArray ];
            reaction ( () => this.mainService.itemsArray, () => {
                this.isSortingActive = false;
                this.sort.sortables.forEach ( ( elem, _ ) => {
                    // @ts-ignore
                    this.sort.sort ( { ...elem, direction: '' } );
                } );
                this._sorted_list = [ ...this.mainService.itemsArray ];
            } );
            this.isFetched = true;
        } );
        
    }
    
    @action compare = ( a: number | string, b: number | string, isAsc: boolean ) => {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    };
    
    @action sortData ( event ) {
        this.currentSort = event;
        if ( this.currentSort.active === 'name' ) {
            if ( this.currentSort.direction === '' ) {
                this.isSortingActive = false;
            } else if ( this.currentSort.direction === 'asc' ) {
                
                this._sorted_list = this.sorted_list.sort ( ( a, b ) => this.compare ( a.name, b.name, true ) );
                
                this.isSortingActive = true;
                //sort from min to max
            } else if ( this.currentSort.direction === 'desc' ) {
                
                this._sorted_list    = this.sorted_list.sort ( ( a, b ) => this.compare ( a.name, b.name, false ) );
                this.isSortingActive = true;
            }
        } else {
            if ( this.currentSort.direction === '' ) {
                this.isSortingActive = false;
            } else if ( this.currentSort.direction === 'asc' ) {
                
                this._sorted_list    = this.sorted_list.sort ( ( a, b ) => this.compare ( new Date ( a.date ).getTime (), new Date ( b.date ).getTime (), true ) );
                this.isSortingActive = true;
                //sort from min to max
            } else if ( this.currentSort.direction === 'desc' ) {
                
                this._sorted_list    = this.sorted_list.sort ( ( a, b ) => this.compare ( new Date ( a.date ).getTime (), new Date ( b.date ).getTime (), false ) );
                this.isSortingActive = true;
            }
            
        }
        
    }
    
}
