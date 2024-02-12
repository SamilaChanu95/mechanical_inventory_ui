import { Routes } from '@angular/router';
import { ProductListComponent } from './components/Bajaj/product-list/product-list.component';
import { ProductViewComponent } from './components/Bajaj/product-view/product-view.component';
import { ProductComponent } from './components/product/product.component';
import { TvsProductViewComponent } from './components/TVS/tvs-product-view/tvs-product-view.component';
import { TvsProductListComponent } from './components/TVS/tvs-product-list/tvs-product-list.component';
import { HeroProductListComponent } from './components/Hero/hero-product-list/hero-product-list.component';
import { HeroProductViewComponent } from './components/Hero/hero-product-view/hero-product-view.component';
import { HondaProductListComponent } from './components/Honda/honda-product-list/honda-product-list.component';
import { HondaProductViewComponent } from './components/Honda/honda-product-view/honda-product-view.component';
import { YamahaProductListComponent } from './components/Yamaha/yamaha-product-list/yamaha-product-list.component';
import { YamahaProductViewComponent } from './components/Yamaha/yamaha-product-view/yamaha-product-view.component';
import { MahindraProductListComponent } from './components/Mahindra/mahindra-product-list/mahindra-product-list.component';
import { MahindraProductViewComponent } from './components/Mahindra/mahindra-product-view/mahindra-product-view.component';
import { KawasakiProductListComponent } from './components/Kawasaki/kawasaki-product-list/kawasaki-product-list.component';
import { KawasakiProductViewComponent } from './components/Kawasaki/kawasaki-product-view/kawasaki-product-view.component';
import { KtmProductListComponent } from './components/KTM/ktm-product-list/ktm-product-list.component';
import { KtmProductViewComponent } from './components/KTM/ktm-product-view/ktm-product-view.component';
import { DemarkProductListComponent } from './components/DEMARK/demark-product-list/demark-product-list.component';
import { DemarkProductViewComponent } from './components/DEMARK/demark-product-view/demark-product-view.component';
import { SuzukiProductListComponent } from './components/Suzuki/suzuki-product-list/suzuki-product-list.component';
import { SuzukiProductViewComponent } from './components/Suzuki/suzuki-product-view/suzuki-product-view.component';
import { NotFoundComponent } from './components/NotFound/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    },
    {
        path: 'home',
        redirectTo: '',
        component: ProductComponent
    },
    {
        path: 'bajaj',
        component: ProductListComponent
    },
    {
        path: 'bajaj/:id',
        component: ProductViewComponent
    },
    {
        path: 'tvs',
        component: TvsProductListComponent
    },
    {
        path: 'tvs/:id',
        component: TvsProductViewComponent
    }, 
    {
        path: 'hero',
        component: HeroProductListComponent
    },
    {
        path: 'hero/:id',
        component: HeroProductViewComponent
    }, 
    {
        path: 'honda',
        component: HondaProductListComponent
    },
    {
        path: 'honda/:id',
        component: HondaProductViewComponent
    },
    {
        path: 'yamaha',
        component: YamahaProductListComponent
    },
    {
        path: 'yamaha/:id',
        component: YamahaProductViewComponent
    },
    {
        path: 'mahindra',
        component: MahindraProductListComponent
    },
    {
        path: 'mahindra/:id',
        component: MahindraProductViewComponent
    },
    {
        path: 'ktm',
        component: KtmProductListComponent
    }, 
    {
        path: 'ktm/:id',
        component: KtmProductViewComponent
    },
    {
        path: 'demark',
        component: DemarkProductListComponent
    }, 
    {
        path: 'demark/:id',
        component: DemarkProductViewComponent
    },
    {
        path: 'suzuki',
        component: SuzukiProductListComponent
    }, 
    {
        path: 'suzuki/:id',
        component: SuzukiProductViewComponent
    },
    {
        path: 'kawasaki',
        component: KawasakiProductListComponent
    }, 
    {
        path: 'kawasaki/:id',
        component: KawasakiProductViewComponent
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
