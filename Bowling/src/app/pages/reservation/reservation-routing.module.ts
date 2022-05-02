import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';

const routes: Routes = [{ path: '', component: ReservationComponent }, 
{ path: 'successful', loadChildren: () => import('./successful/successful.module').then(m => m.SuccessfulModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
