import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title:  'Home | Housing App'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details | Housing App'
    },
];

export default routeConfig;