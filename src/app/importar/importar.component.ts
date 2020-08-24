import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../servicios/modelo.service';
import { Modelo } from '../modelos/modelo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {

  constructor(private modeloService: ModeloService) { }

  modelos: Modelo[]=[];
  modelo: Modelo= new Modelo();
  archivo: File= null;

  cargando: boolean=false;

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
    this.cargando=true;
    this.modeloService.importar(this.archivo, this.modelo).subscribe(
      res => {
        if (res.resultado!=null && res.resultado) {
            Swal.fire('Exito', res.mensaje, 'success');
        } else{
          Swal.fire('Error', res.mensaje, 'error')
        }
        this.cargando=false;
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.cargando=false;
      }
    );
  }
}
