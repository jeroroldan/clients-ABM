import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEmpleadoComponent } from './components/add-edit-empleado/add-edit-empleado.component';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MensajeConfirmacionComponent } from './components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormMaterialComponent } from './form-material/form-material.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEditEmpleadoComponent,
    ListEmpleadoComponent,
    NavbarComponent,
    MensajeConfirmacionComponent,
    AboutComponent,
    SidebarComponent,
    FormMaterialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
