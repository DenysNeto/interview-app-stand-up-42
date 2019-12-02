import axios from 'axios';
import { ItemDescriptionPayload, ItemPayload } from '../../interfaces/PayloadTypes';
import { action, computed, observable } from 'mobx';
import { forEach, findIndex } from 'lodash';
import { toJS } from 'mobx';
import { Injectable } from '@angular/core';

const DOMAIN   = 'map42.gear.host/api';
const PROTOCOL = 'https://';

const URL = `${PROTOCOL}${DOMAIN}`;

// the number of .net ticks at the unix epoch
const EPOCH_TICKS              = 621355968000000000;
// there are 10000 .net ticks per millisecond
const TICKS_PER_MILLIS: number = 10000;

@Injectable (
    {
        providedIn: 'root',
    },
)
export class MainService {
    
    @observable _itemsArray: ItemPayload[] = [];
    
    @computed get itemsArray (): ItemPayload[] {
        return toJS ( this._itemsArray );
    }
    
    constructor () {
    
    }
    
    @action sortByName ( direction: 'asc' | 'desc' | '' ) {
    
    }
    
    @action sortByDate () {
    
    }
    
    @action findByIdAndDelete ( id: string ) {
        let temp = findIndex ( this.itemsArray, ( elem, index ) => {
            
            if ( elem.id === id ) {
                return index.toString ();
            }
        } );
        
        this.itemsArray.splice ( temp, 1 );
        this.setItemArray ( this.itemsArray );
    }
    
    @action
    async editItem ( id: string, payload: ItemDescriptionPayload ) {
        this.findByIdAndDelete ( id );
        await this.addNewItem ( payload, true, id );
    }
    
    @action deleteItem ( id: string ) {
        return new Promise ( ( resolve, reject ) => {
            axios.delete ( `${URL}/Entity/${id}` ).then ( ( response ) => {
                this.findByIdAndDelete ( id );
                resolve ( response.statusText );
            } ).catch ( ( error ) => {
                console.log ( '[c] error deleteItem [DELETE]', error );
                alert ( error.message );
                reject ( error );
            } );
            
        } );
    }
    
    @action getDateFromServer ( date: number ) {
        if ( new Date ().getTime () < date ) {
            return new Date ( this.convertTickIntoDate ( date ) );
        }
        return new Date ( date );
    }
    
    @action addItemArray ( value: ItemPayload ) {
        this._itemsArray.push ( value );
    }
    
    @action setItemArray ( arr: ItemPayload[] ) {
        this._itemsArray = arr;
    }
    
    @action convertTickIntoDate ( ticks: number ) {
        return ((ticks - EPOCH_TICKS) / TICKS_PER_MILLIS);
    }
    
    @action convertDateIntoTicks ( date: Date ) {
        return EPOCH_TICKS + (date.getTime () * TICKS_PER_MILLIS);
    }
    
    @action addNewItem ( payload: ItemDescriptionPayload, edit?: boolean, id?: string ) {
        return new Promise ( ( resolve, reject ) => {
            //EDIT action
            if ( edit ) {
                axios.post ( `${URL}/Entity`, {
                    Id         : id,
                    Name       : payload.name,
                    Description: payload.description,
                    Amount     : payload.amount,
                    Date       : payload.date ? this.convertDateIntoTicks ( payload.date ) : null,
                    IsPrivate  : payload.isPrivate,
                } )
                .then ( (( response ) => {
                    this.addItemArray ( {
                        id  : response.data.Id,
                        date: response.data.Date ? this.getDateFromServer ( response.data.Date ) : null,
                        name: response.data.Name,
                    } );
                    resolve ( response.data );
                }) )
                .catch ( ( error ) => {
                    console.log ( '[c] error addNewItem [PUT]', error );
                    alert ( error.message );
                    reject ( error );
                } );
                //ADD action
            } else {
                axios.post ( `${URL}/Entity`, {
                    Name       : payload.name,
                    Description: payload.description,
                    Amount     : payload.amount,
                    Date       : payload.date ? this.convertDateIntoTicks ( payload.date ) : null,
                    IsPrivate  : payload.isPrivate,
                } )
                .then ( (( response ) => {
                    this.addItemArray ( {
                        id  : response.data.Id,
                        date: response.data.Date ? this.getDateFromServer ( response.data.Date ) : null,
                        name: response.data.Name,
                    } );
                    resolve ( response.data );
                }) )
                .catch ( ( error ) => {
                    console.log ( '[c] error addNewItem [POST]', error );
                    alert ( error.message );
                    reject ( error );
                } );
            }
        } );
    }
    
    @action getItemById ( id: string ) {
        return new Promise ( ( resolve, reject ) => {
            axios.get ( `${URL}/Entity/${id}` ).then ( ( response ) => {
                resolve ( response.data );
                
            } ).catch ( ( error ) => {
                console.log ( '[c] error getItemById [GET] ', error );
                alert ( error.message );
                reject ( error );
            } );
            
        } );
        
    }
    
    @action getDateFormatted ( date: Date ) {
        let dd: number | string = date.getDate ();
        let mm: number | string = date.getMonth () + 1; //January is 0!
        
        let yyyy = date.getFullYear ();
        if ( dd < 10 ) {
            dd = '0' + dd;
        }
        if ( mm < 10 ) {
            mm = '0' + mm;
        }
        return `${yyyy}-${mm}-${dd}`;
        
    }
    
    @action getAllItems () {
        return new Promise ( ( resolve, reject ) => {
            axios.get ( `${URL}/Entity` ).then ( ( response ) => {
                    forEach ( response.data.List, ( elem ) => {
                        this._itemsArray.push ( {
                            id  : elem.Id,
                            name: elem.Name,
                            date: elem.Date ? this.getDateFromServer ( elem.Date ) : null,
                        } );
                    } );
                    resolve ();
                    
                },
            ).catch ( ( error: Error ) => {
                console.log ( '[c] error getAllItems', error );
                alert ( error.message );
                reject ( error );
            } );
            
        } );
        
    }
    
    produceEvent () {
    
    }
    
}

