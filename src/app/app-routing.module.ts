import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MenuItemsComponent } from './menu-items/menu-items/menu-items.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: "customers",
        pathMatch: "full"
      },
      {
        path: 'restaurants/:id/menu-items',
        component: MenuItemsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
