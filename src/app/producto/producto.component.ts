import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { CoreService } from '../tabla-editable/services/core.service';
import { GrupoProducto } from '../modelos/grupo-producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  panelOpenState=false;
  displayedColumnsSugerido: string[] = ['position', 'medida', 'segmento', 'costo', 'ganancia', 'precio', 'pvp'];
  displayedColumnsVenta: string[] = ['position', 'pvpf', 'rendimiento', 'utilidad'];
  dataSource = this.core.list$;
  controls: FormArray;
  grupo_producto: GrupoProducto[]=[];

  constructor(private core: CoreService) { }

  ngOnInit() {
    
  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index,field,control.value);
    }

   }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  nuevo(event){

  }
  
  crear(event){

  }

  actualizar(event){

  }
}
