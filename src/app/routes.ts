import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes : Routes = [
	{path: 'article', component: ArticleComponent},
	{path: 'auth', component: AuthComponent},
	{path: 'profile', component: ProfileComponent},
	{path: 'main', component: MainComponent},
	{path: '', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, {useHash: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule {}