import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { TableDataSource, ValidatorService } from 'angular4-material-table';

import { PersonValidatorService } from './services/person-validator.service';
import { Person } from './person'; //clase
import { PeriodicElement } from './models/periodic'; //interface

import { CoreService } from './services/core.service';

@Component({
  selector: 'app-tabla-editable',
  providers: [{provide: ValidatorService, useClass: PersonValidatorService }],
  templateUrl: './tabla-editable.component.html',
  styleUrls: ['./tabla-editable.component.scss']
})
export class TablaEditableComponent implements OnInit {

  displayedColumns1: string[] = ['position', 'medida', 'segmento', 'costo', 'ganancia', 'precio', 'pvp'];
  dataSource1 = this.core.list$;
  controls: FormArray;

  displayedColumns = ['position', 'segmento', 'precio', 'actionsColumn'];
  @Input() personList = this.dataSource1.value;
  /*[ 
    { position: 1, segmento: 'Mark', precio: 15 },
    { position: 2, segmento: 'Brad', precio: 50 },
    ] ;*/
  @Output() personListChange = new EventEmitter<PeriodicElement[]>();

  dataSource: TableDataSource<PeriodicElement>;

  constructor(private core: CoreService, 
    private personValidator: ValidatorService
    ) { }

  ngOnInit() {
    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        position:  new FormControl(entity.position, Validators.required),
        medida: new FormControl(entity.medida, Validators.required), 
        segmento: new FormControl(entity.segmento, Validators.required), 
        costo: new FormControl(entity.costo, Validators.required),
        ganancia: new FormControl(entity.ganancia, Validators.required), 
        precio: new FormControl(entity.precio, Validators.required),
        pvp: new FormControl(entity.pvp, Validators.required)
      },{updateOn: "blur"});
      
    });
    
    console.log(this.dataSource1.value);
    this.controls = new FormArray(toGroups);
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
    console.log(this.personValidator);
    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
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
