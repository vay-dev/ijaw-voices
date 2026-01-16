import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Svg } from './svg/svg';
import { ToastComponent } from './toast/toast';

@NgModule({
  declarations: [Svg],
  imports: [CommonModule, ToastComponent],
  exports: [Svg, ToastComponent],
})
export class ComponentsModule {}
