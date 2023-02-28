import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
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
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    NgbModule,
    ProyectosModule,
    ServiciosModule,
    ServicioModule,
    MatTableModule,
    NgHttpLoaderModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://e-scan.ovh:8087/operacion','http://localhost:8087/operacion'],
        sendAccessToken: true
      }
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
