import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API } from '../../interface/api';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrl: './api-list.component.scss'
})
export class APIListComponent {
  @Input() apisList: API[];

  @Output() seleccionar = new EventEmitter<number>();
}
