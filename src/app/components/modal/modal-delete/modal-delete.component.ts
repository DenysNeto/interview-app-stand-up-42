import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { action } from 'mobx-angular';
import {MainService} from '../../../services/MainService';

@Component ( {
    selector   : 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls  : [  '../modal.css' ],
} )
export class ModalDeleteComponent {
    @Input () itemId: string;
    closeResult: string;
     activeModal: NgbModalRef;
    
    constructor ( private modalService: NgbModal, private mainService: MainService  ) {
    }
    
    open ( content ) {
        this.activeModal  =   this.modalService.open ( content, { ariaLabelledBy: 'modal-edit-basic-title' } )
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
    
    @action
    async deleteItem () {
        await this.mainService.deleteItem ( this.itemId );
        this.activeModal.close ();
    }
    
}
