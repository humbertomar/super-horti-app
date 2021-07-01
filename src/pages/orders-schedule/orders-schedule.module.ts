import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersSchedulePage } from './orders-schedule';

@NgModule({
  declarations: [
    OrdersSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersSchedulePage),
  ],
})
export class OrdersSchedulePageModule {}
