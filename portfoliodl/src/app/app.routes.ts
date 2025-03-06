import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImprintComponent } from './pages/imprint/imprint.component';

export const appRoutes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'imprint', component: ImprintComponent } 
];
