import { Injectable } from '@angular/core';
import { observable } from 'mobx';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    @observable isModalOpen : boolean = false;
    
  constructor() {
  
  
  
  }
}
