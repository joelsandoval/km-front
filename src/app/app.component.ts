import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';
import { LoginService } from './services/seguridad/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'km-front';

  username!: string;
  isLogged!: boolean;
  isAdmin!: boolean;

  constructor(
    private oauthService: OAuthService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8180/realms/kmc',
    redirectUri: 'http://localhost:4200/km-front/home',
    clientId: 'kmc-front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    requireHttps: false
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          //this.username = this.loginService.getUsername();
          //this.messageService.sendMessage(this.loginService.getUsername());
        }
      });
  }
  
  logout() {
    this.loginService.logout();
  }

}
