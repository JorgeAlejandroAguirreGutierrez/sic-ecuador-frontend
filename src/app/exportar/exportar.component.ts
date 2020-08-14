import { Component, OnInit } from '@angular/core';
import { Modelo } from '../modelos/modelo';
import { ModeloService } from '../servicios/modelo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {

  modelos: Modelo[]=[];
  modelo: Modelo= new Modelo();
  constructor(private modeloService: ModeloService) { }

  ngOnInit() {
    this.consulta_modelos();
  }
  consulta_modelos(){
    this.modeloService.consultar().subscribe(
      res => {
        if (res.resultado!=null) {
          this.modelos = res.resultado as Modelo[]
        }
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
  exportar(){
    this.modeloService.exportar(this.modelo).subscribe(
      res => {
        if (res.resultado!=null && res.resultado) {
            Swal.fire('Exito', res.mensaje, 'success');
        } else{
          Swal.fire('Error', res.mensaje, 'error')
        }
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
