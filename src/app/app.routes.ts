import { Routes } from '@angular/router';
import { ProductListComponent } from './components/Bajaj/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'bajaj',
        component: ProductListComponent
    }
];
