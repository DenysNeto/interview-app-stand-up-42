import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MainService} from '../../../services/MainService';
import { action, computed, observable,} from 'mobx-angular';
import { toJS } from 'mobx';
import { ItemDescriptionPayloadComponent } from '../../../../interfaces/PayloadTypes';

@Component ( {
    selector       : 'app-modal-description',
    templateUrl    : './modal-description.component.html',
    styleUrls      : [  '../modal.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class ModalDescriptionComponent implements OnInit {
    
    closeResult: string;
    @Input () itemId: string;
    @observable modalSize: 'sm' | 'lg' | 'xl'          = 'lg';
    @observable _item: ItemDescriptionPayloadComponent = null;

//
    constructor ( private modalService: NgbModal, private mainService: MainService ) {
    }
    
    @computed get item (): ItemDescriptionPayloadComponent {
        return toJS ( this._item );
    }
    
    @action descriptionApearence ( description: string ) {
        if ( description && description.length > 100 ) {
            let temp = '';
            for ( let i = 0; i * 80 < description.length; i++ ) {
                temp += description.substr ( i * 80, 80 ) + '\n';
            }
            return temp;
        }
        return description;
        
    }
    
    @action
    async handleRequest () {
        let temp: any = await this.mainService.getItemById ( this.itemId );
        if ( (temp.Description && temp.Description.length > 60) || (temp.Name && temp.Name.length > 60) ) {
            this.modalSize = 'xl';
        } else if ( (temp.Description && temp.Description.length < 40) || (temp.Name && temp.Name.length < 40) ) {
            this.modalSize = 'lg';
        }
        
        this._item = {
            name       : temp.Name,
            description: this.descriptionApearence ( temp.Description ),
            amount     : temp.Amount,
            date       : this.mainService.getDateFormatted ( this.mainService.getDateFromServer ( temp.Date ) ),
            isPrivate  : temp.IsPrivate,
            
        };
        
    }
    
    ngOnInit () {
        
    }
    
    //
    open ( content ) {
        this.handleRequest ().then ( () => {
                this.modalService.open ( content, {
                    ariaLabelledBy: 'modal-edit-basic-title',
                    size: this.modalSize,
                } ).result.then ( ( result ) => {
                    this.closeResult = `Closed with: ${result}`;
                }, ( reason ) => {
                    this.closeResult = `Dismissed ${this.getDismissReason ( reason )}`;
                } );
            },
        ).catch ( ( error ) => console.log ( '[c] error', error ) );
        
    }
    
    private getDismissReason ( reason: any ): string {
        if ( reason === ModalDismissReasons.ESC ) {
            return 'by pressing ESC';
        } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
