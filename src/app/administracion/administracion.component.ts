import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../servicios/modelo.service';
import { Modelo } from '../modelos/modelo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private modeloService: ModeloService) { }

  modelos: Modelo[]=[];
  modelo: Modelo= new Modelo();
  archivo: File= null;

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
  cargar_archivo(archivos: FileList){
    this.archivo = archivos.item(0);
  }
  importar(){
    this.modeloService.importar(this.archivo, this.modelo).subscribe(
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
  exportar(){
    
  }

}
