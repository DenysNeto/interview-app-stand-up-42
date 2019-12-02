import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberValidator } from '../validators/NumberVlidator';
import { action, observable } from 'mobx-angular';
import { reaction } from 'mobx';
import { MainService } from '../../../services/MainService';



@Component ( {
    selector   : 'app-modal-add',
    templateUrl: './modal-add.component.html',
    styleUrls  : [ '../modal.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    
    
    
} )
export class ModalAddComponent implements OnInit {
    @Input () forEditing?: boolean = false;
    @Input () itemId?: string;
    @observable addItemForm: FormGroup;
    @observable date: {
        year: string | number,
        day: string | number,
        month: string | number
    } | null                       = null;
    
    @observable initialValuesForEditing: any = [];
    @observable  activeModal: NgbModalRef;
    
    constructor ( private modalService: NgbModal, private formBuilder: FormBuilder, private mainService: MainService ) {
        reaction ( () => this.addItemForm, () => {
            if ( this.addItemForm && this.forEditing ) {
                this.dataChangeDetection ();
            }
        } );
    }
    
    validation_error_messages = {
        'name': [
            { type: 'required', message: 'Name is required field' },
            { type: 'maxlength', message: 'Name length should be [1-99]' },
        
        ],
        
        'amount': [
            { type: 'maxlength', message: 'Amount length should be [0-6]' },
            { type: 'validInteger', message: 'Amount should be a number' },
        ],
        'date'  : [
            { type: 'required', message: 'Date is required field' },
        ],
    };
    
    ngOnInit () {
    
    }
    
    @action dataChangeDetection () {
        if ( this.forEditing ) {
            let temp = 0;
            for ( let key in this.initialValuesForEditing ) {
                if ( key === 'date' ) {
                    if ( this.initialValuesForEditing[ key ] && this.initialValuesForEditing[ key ].day == this.addItemForm.get ( key ).value.day &&
                        this.initialValuesForEditing[ key ].month == this.addItemForm.get ( key ).value.month &&
                        this.initialValuesForEditing[ key ].year == this.addItemForm.get ( key ).value.year ) {
                        temp += 0;
                    } else if ( !this.initialValuesForEditing[ key ] ) {
                        temp += 0;
                    } else {
                        temp += 1;
                    }
                    
                } else if ( this.initialValuesForEditing[ key ] != this.addItemForm.get ( key ).value ) {
                    temp++;
                }
            }
            return temp !== 0 && this.addItemForm.valid;
        } else {
            return this.addItemForm.valid;
        }
    }
    
    @action createForm () {
        this.addItemForm = this.formBuilder.group ( {
            name       : new FormControl ( '', Validators.compose ( [
                Validators.maxLength ( 100 ),
                Validators.required,
            ] ) ),
            amount     : new FormControl ( '', Validators.compose ( [
                Validators.maxLength ( 6 ),
                NumberValidator.validInteger,
            ] ) ),
            date       : new FormControl (),
            description: new FormControl (),
            private    : new FormControl (),
            
        } );
    }
    
    @action createFormForEditing (
        payload: {
            name: string,
            amount: number,
            date: {
                year: string | number,
                day: string | number,
                month: string | number
            } | null,
            description: string,
            private: boolean
        } ) {
        
        this.initialValuesForEditing = { ...payload };
        
        this.addItemForm = this.formBuilder.group ( {
            name       : new FormControl ( payload.name, Validators.compose ( [
                Validators.maxLength ( 100 ),
                
                Validators.required,
            ] ) ),
            amount     : new FormControl ( payload.amount, Validators.compose ( [
                Validators.maxLength ( 6 ),
                NumberValidator.validInteger,
            ] ) ),
            date       : new FormControl ( payload.date ),
            description: new FormControl ( payload.description ),
            private    : new FormControl ( payload.private ),
            
        } );
        
        this.dataChangeDetection ();
    }
    
   @action open ( content ) {
        if ( this.forEditing ) {
            this.mainService.getItemById ( this.itemId ).then ( ( response: any ) => {
                let date_temp = response.Date && this.mainService.getDateFromServer ( response.Date );
                
                // this.mainService.getDateFromServer
                this.createFormForEditing ( {
                    name       : response.Name,
                    amount     : response.Amount,
                    description: response.Description,
                    private    : response.IsPrivate,
                    date       : date_temp ? {
                        year : date_temp.getFullYear (),
                        month: date_temp.getMonth () + 1,
                        day  : date_temp.getDate (),
                    } : null,
                } );
                
                this.activeModal = this.modalService.open ( content, { ariaLabelledBy: 'modal-edit-basic-title' } );
            } ).catch ( ( error ) => {
                console.log ( '[c] error Component', error );
            } );
        } else {
            this.createForm ();
            this.activeModal = this.modalService.open ( content, { ariaLabelledBy: 'modal-edit-basic-title' } );
        }
        
    }
    
 @action   async onSubmitUserDetails ( e ) {
        e.preventDefault ();
        let temp_date = this.addItemForm.get ( 'date' ).value;
        let date: any = null;
        if ( temp_date ) {
            date = new Date ( temp_date.year, temp_date.month - 1, temp_date.day );
        }
        
        let payload = {
            name       : this.addItemForm.get ( 'name' ).value,
            description: this.addItemForm.get ( 'description' ).value,
            amount     : this.addItemForm.get ( 'amount' ).value,
            isPrivate  : this.addItemForm.get ( 'private' ).value,
            date,
            // this.addItemForm.get ( 'private' ).value
        };
        this.forEditing ? await this.mainService.editItem ( this.itemId, payload )
            :
            await this.mainService.addNewItem ( payload );
        
        this.activeModal.close ();
        this.addItemForm.reset ();
        
    }
    
}

