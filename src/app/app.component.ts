import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';
import { LoginService } from './services/seguridad/login.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kmc-front';

  username!: string;
  isLogged!: boolean;
  isAdmin!: boolean;
  private urlSecure = environment.ApiConfig.rutaIssuer;

  constructor(
    private oauthService: OAuthService,
    private messageService: MessageService,
    private loginService: LoginService,
  ) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: this.urlSecure,
    redirectUri: `${window.location.origin}/km-front/home`,
    clientId: 'kmc-front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    requireHttps: false,
    disableAtHashCheck: true,
  };

  configure(): void {
    console.log('pasa a ver si entra al config')
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then((algo: any) => {
      console.log(algo);
      console.log(this.oauthService.tryLogin());
    })
      .then((algo: any) => {
        console.log(algo);
        console.log('¿tiene los claims?')
        console.log(this.oauthService.getAccessToken());
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          console.log(`Está logueado ${this.isLogged}`);
        }
      });
  }

  logout() {
    this.loginService.logout();
  }

}
