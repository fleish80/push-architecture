import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { AlbumsListComponent } from './pages/albums-list/albums-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    AlbumsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
