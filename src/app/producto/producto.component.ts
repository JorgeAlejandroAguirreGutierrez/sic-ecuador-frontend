import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { CoreService } from '../tabla-editable/services/core.service';

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

  constructor(private core: CoreService) { }

  ngOnInit() {
    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        position:  new FormControl(entity.position, Validators.required),
        medida: new FormControl(entity.medida, Validators.required), 
        segmento: new FormControl(entity.segmento, Validators.required), 
        costo: new FormControl(entity.costo, Validators.required),
        ganancia: new FormControl(entity.ganancia, Validators.required), 
        precio: new FormControl(entity.precio, Validators.required),
        pvp: new FormControl(entity.pvp, Validators.required),
        pvpf: new FormControl(entity.pvpf, Validators.required),
        rendimiento: new FormControl(entity.rendimiento, Validators.required), 
        utilidad: new FormControl(entity.utilidad, Validators.required)
      },{updateOn: "blur"});
    });

    this.controls = new FormArray(toGroups);
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
}
