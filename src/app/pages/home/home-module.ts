import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Profile } from './profile/profile';
import { ComponentsModule } from '../../shared/components/components-module';

@NgModule({
  declarations: [Dashboard, Layout, Sidebar, Profile],
  imports: [CommonModule, HomeRoutingModule, RouterOutlet, DatePipe, ComponentsModule],
})
export class HomeModule {}
