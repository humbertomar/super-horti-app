import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusEnderecosPage } from './meus-enderecos';

@NgModule({
  declarations: [
    MeusEnderecosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusEnderecosPage),
  ],
})
export class MeusEnderecosPageModule {}
