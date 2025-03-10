import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrListComponent } from './curr-list/curr-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TaskServiceService } from './task-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [HttpClientModule, HttpClient, TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }