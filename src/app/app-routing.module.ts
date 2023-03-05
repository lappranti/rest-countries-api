import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountrieDetailComponent } from './components/countrie-detail/countrie-detail.component';
import { CountriesComponent } from './components/countries/countries.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  { path: 'country/:id', component: CountrieDetailComponent },
  { path: '**', component: CountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
