import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './interfaces/pages/dashboard/dashboard.component';
import { TablesComponent } from './interfaces/pages/tables/tables.component';
import { FormsComponent } from './interfaces/pages/forms/forms.component';
import { TypographyComponent } from './interfaces/pages/typography/typography.component';
import { MapsComponent } from './interfaces/pages/maps/maps.component';
import { NotificationsComponent } from './interfaces/pages/notifications/notifications.component';

import { HtmlFooterComponent } from './interfaces/footer/footer.component';

import {LoginComponent} from "./tienda/login/login.component";
import { PedidosComponent } from "./tienda/pedidos/pedidos.component";
import { SliderComponent } from './tienda/slider/slider.component';

const routes: Routes = [
  {path: '',   redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'footer', component: HtmlFooterComponent},
  
  {path: 'login', component: LoginComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'slider', component: SliderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
