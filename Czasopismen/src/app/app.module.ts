import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagesFrameComponent } from './images-frame/images-frame.component';
import {HttpClientModule} from '@angular/common/http';
import { DatesPageComponent } from './dates-page/dates-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesFrameComponent,
    DatesPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
