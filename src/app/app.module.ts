
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosModule } from './dashboard/proyectos/proyectos.module';
import { ServiciosModule } from './dashboard/servicios/servicios.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServicioModule } from './dashboard/servicio/servicio.module';
import { MatTableModule } from '@angular/material/table';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TestComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    NgbModule,
    ProyectosModule,
    ReactiveFormsModule,
    ServiciosModule,
    ServicioModule,
    MatSnackBarModule,
    MatTableModule,
    NgHttpLoaderModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://e-scan.ovh:8087/operacion','http://localhost:8087/operacion'],
        sendAccessToken: true
      }
    }),
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
