import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { action } from 'mobx-angular';
import {MainService} from '../../../services/MainService';

@Component ( {
    selector   : 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls  : [  '../modal.css' ],
    
} )
export class ModalDeleteComponent {
    @Input () itemId: string;
     activeModal: NgbModalRef;
    
    constructor ( private modalService: NgbModal, private mainService: MainService  ) {
    }
    
    open ( content ) {
        this.activeModal  =   this.modalService.open ( content, { ariaLabelledBy: 'modal-edit-basic-title' } )
    }
    
    @action
    async deleteItem () {
        await this.mainService.deleteItem ( this.itemId );
        this.activeModal.close ();
    }
    
}
