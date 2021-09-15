import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeSearchComponent } from './unishf/employee-search/employee-search.component';
import { NotFoundComponent } from './unishf/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: EmployeeSearchComponent },
  { path: 'heroes', component: EmployeeSearchComponent },
  { path: 'heroes?', component: EmployeeSearchComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
