import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Layout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Dashboard },
      { path: 'profile', component: Profile },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
