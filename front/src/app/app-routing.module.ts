
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGetComponent } from './user-get/user-get.component';

import {EmpresaAddComponent} from './empresa-add/empresa-add.component';
import {EmpresaEditComponent} from './empresa-edit/empresa-edit.component';
import {EmpresaGetComponent} from './empresa-get/empresa-get.component';


import {WorkLogAddComponent} from './work-log-add/work-log-add.component';
import {WorkLogGetComponent} from './work-log-get/work-log-get.component';
import {WorkLogEditComponent} from './work-log-edit/work-log-edit.component';

const routes: Routes =
[
  //Users
  {
    path: 'users',
    component: UserGetComponent
  },

  {
    path: 'users/create',
    component: UserAddComponent
  },

  {
    path: 'users/edit/:id',
    component: UserEditComponent
  },

  // Empresas
  {
    path: 'empresas',
    component: EmpresaGetComponent
  },

  {
    path: 'empresas/create',
    component: EmpresaAddComponent
  },

  {
    path: 'empresas/edit/:id',
    component: EmpresaEditComponent
  },


  // Worklogs
  {
    path: 'worklogs',
    component: WorkLogGetComponent
  },

  {
    path: 'worklogs/create',
    component: WorkLogAddComponent
  },

  {
    path: 'worklogs/edit/:id',
    component: WorkLogEditComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
