import { Routes } from '@angular/router';
import { ProductListComponent } from './components/Bajaj/product-list/product-list.component';
import { ProductViewComponent } from './components/Bajaj/product-view/product-view.component';
import path from 'path';

export const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'bajaj',
        component: ProductListComponent
    },
    {
        path: 'bajaj/:id',
        component: ProductViewComponent
    }
];
