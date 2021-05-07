import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/common/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { RecipientaddComponent } from './components/recipientadd/recipientadd.component';
import { TransferaddComponent } from './components/transferadd/transferadd.component';
import { HistoryComponent } from './components/history/history.component';
import { NotfoundComponent } from './components/common/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RecipientaddComponent,
    TransferaddComponent,
    HistoryComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
