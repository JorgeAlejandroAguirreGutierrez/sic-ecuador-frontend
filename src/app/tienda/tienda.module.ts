import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TiendaRoutes } from './tienda.routing';
import { ChartistModule } from 'ng-chartist';
import { ContenidoComponent } from './contenido/contenido.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(TiendaRoutes)
  ],
  declarations: [ContenidoComponent]
})
export class TiendaModule {}
