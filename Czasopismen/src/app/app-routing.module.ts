import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagesFrameComponent } from './images-frame/images-frame.component';
import { DatesPageComponent } from './dates-page/dates-page.component';
import { AppComponent } from './app.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [
  {path: 'brands', component: ImagesFrameComponent},
  {path: 'dates/:brand', component: DatesPageComponent},
  {path: 'dates/:brand/:yearinit', component: DatesPageComponent},
  {path: 'brands/modify', component: UpdateCategoryComponent},
  {path: "**", component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
