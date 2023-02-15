import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { BlogComponent } from './blog/blog.component';
import { BusinessUsersComponent } from './business-users/business-users.component';
import { DiscountComponent } from './discount/discount.component';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { ManageBlogComponent } from './manage-blog/manage-blog.component';
import { ManageOffersComponent } from './manage-offers/manage-offers.component';
import { MarginsComponent } from './margins/margins.component';
import { OfferComponent } from './offer/offer.component';
import { UsersComponent } from './user/users.component';
import { VisaComponent } from './visa/visa.component';
import { BlogDetailPageComponent } from './blog/blog-detail-page/blog-detail-page.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { OfferByAirlineComponent } from './offer/offer-by-airline/offer-by-airline.component';
import { VisaCheckComponent } from './home/visa-check/visa-check.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('././home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('././auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'about-us',
  //   component: AboutUsComponent
  // },
  {
    path: 'about-us',
    loadChildren: () =>
      import('././about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('././privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'terms-and-condition',
    loadChildren: () =>
      import('././terms-and-condition/terms-and-condition.module').then(
        (m) => m.TermsAndConditionModule
      ),
  },
  {
    path: 'underconstruction',
    loadChildren: () =>
      import('./underconstruction/underconstruction.module').then(
        (m) => m.UnderconstructionModule
      ),
  },
  {
    path: 'business-users',
    component: BusinessUsersComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog-detail/:title/:blogId',
    component: BlogDetailPageComponent,
  },
  {
    path: 'business-users',
    component: BusinessUsersComponent,
  },
  // {
  //   path: 'contact-us',
  //   component: ContactUsComponent,
  // },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
  },
  {
    path: 'discount',
    component: DiscountComponent,
  },
  {
    path: 'manage-alerts',
    component: ManageAlertsComponent,
  },
  {
    path: 'manage-blog',
    component: ManageBlogComponent,
  },
  {
    path: 'manage-offers',
    component: ManageOffersComponent,
  },
  {
    path: 'margins',
    component: MarginsComponent,
  },
  {
    path: 'offers',
    component: OfferComponent,
  },
  {
    path: 'offer-detail/:offerId',
    component: OfferDetailComponent,
  },
  {
    path: 'offers-airline/:airline',
    component: OfferByAirlineComponent,
  },
  {
    path: 'visas/:country',
    component: VisaCheckComponent,
  },
  {
    path: 'visas',
    component: VisaComponent,
  },
  // {
  //   path: 'visa',
  //   component: VisaComponent,
  // },
  {
    path: 'user',
    component: UsersComponent,
    loadChildren: () =>
      import('././user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'travel-agent',
    loadChildren: () =>
      import('././travel-agent/Travel.module').then((m) => m.TravelModule),
  },
  {
    path: 'business-user',
    loadChildren: () =>
      import('././business-user/business-user.module').then(
        (m) => m.BusinessUserModule
      ),
  },
  {
    path: 'banks',
    loadChildren: () =>
      import('./banks/banks.module').then((m) => m.BanksModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
