import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamenComponent} from "./pages/examen/examen.component";
import {PruebaComponent} from "./pages/prueba/prueba.component";
import {PruebasComponent} from "./components/pruebas/pruebas.component";

const routes: Routes = [
  {path: 'examen', component: ExamenComponent},
  {path: 'prueba', component: PruebaComponent},
  {path: 'prueba/edit/:id', component: PruebaComponent},
  {path: 'pruebas', component: PruebasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
