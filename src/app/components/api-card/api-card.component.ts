import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API } from '../../interface/api';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrl: './api-card.component.scss'
})
export class APICardComponent {
  @Input() apis: API;
  
  @Output() seleccionar = new EventEmitter<number>();

  onSelect(): void {
    this.seleccionar.emit(this.apis.id);
  }
}