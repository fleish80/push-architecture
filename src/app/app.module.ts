import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserTableComponent} from './pages/user-table/user-table.component';
import {HttpClientModule} from '@angular/common/http';
import { PhotoComponent } from './pages/photo/photo.component';

@NgModule({
    declarations: [
        AppComponent,
        UserTableComponent,
        PhotoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
