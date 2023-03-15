import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { DetProductoComponent } from './components/det-producto/det-producto.component';
import { ProdBlusasComponent } from './components/m-v-productos/prod-blusas/prod-blusas.component';
import { ProdPolosComponent } from './components/m-v-productos/prod-polos/prod-polos.component';
import { ProdPolerasComponent } from './components/m-v-productos/prod-poleras/prod-poleras.component';
import { ProdChompasComponent } from './components/m-v-productos/prod-chompas/prod-chompas.component';
import { ProdVestidosComponent } from './components/m-v-productos/prod-vestidos/prod-vestidos.component';
import { ProdShortsComponent } from './components/m-v-productos/prod-shorts/prod-shorts.component';
import { ProdJeansComponent } from './components/m-v-productos/prod-jeans/prod-jeans.component';

const routes: Routes = [
  {path: 'car', component: CarritoComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'colecciones', component: CollectionsComponent},
  {path: 'detproducto/:idproduc', component: DetProductoComponent},
  {path: 'productos/blusas', component: ProdBlusasComponent},
  {path: 'productos/polos', component: ProdPolosComponent},
  {path: 'productos/poleras', component: ProdPolerasComponent},
  {path: 'productos/chompas', component: ProdChompasComponent},  
  {path: 'productos/vestidos', component: ProdVestidosComponent},  
  {path: 'productos/shorts', component: ProdShortsComponent},  
  {path: 'productos/jeans', component: ProdJeansComponent},  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
