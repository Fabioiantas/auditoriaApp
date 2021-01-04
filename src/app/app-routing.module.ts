import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'auditoria-entidade',
    loadChildren: () => import('./auditoria-entidade/auditoria-entidade.module').then( m => m.AuditoriaEntidadePageModule)
  },
  {
    path: 'auditoria-local',
    loadChildren: () => import('./auditoria-local/auditoria-local.module').then( m => m.AuditoriaLocalPageModule)
  },
  {
    path: 'auditar',
    loadChildren: () => import('./auditar/auditar.module').then( m => m.AuditarPageModule)
  },
  {
    path: 'item-requisitos/:id',
    loadChildren: () => import('./item-requisitos/item-requisitos.module').then( m => m.ItemRequisitosPageModule)
  },
  {
    path: 'requisito',
    loadChildren: () => import('./requisito/requisito.module').then( m => m.RequisitoPageModule)
  },
  {
    path: 'page-header',
    loadChildren: () => import('./page-header/page-header.module').then( m => m.PageHeaderPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
