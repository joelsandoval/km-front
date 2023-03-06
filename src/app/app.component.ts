import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { MessageService } from './services/message.service';
import { AuthService } from './services/seguridad/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kmc-front';

  isLogged: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;
  roles: string[] = [];
  urlSecure = environment.ApiConfig.rutaIssuer;

  authConfig: AuthConfig = {
    issuer: this.urlSecure,
    redirectUri: `${window.location.origin}/km-front`,
    clientId: 'kmc-front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    disableAtHashCheck: true,
    showDebugInformation: true,
    requireHttps: false
  };

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private messageService: MessageService
  ) {
    this.configure(this.authConfig);
  }

  login() {
    this.authService.login();
  }


  logout() {
    this.authService.logout();
  }

  public configure(authConfig: AuthConfig): void {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin({
        onTokenReceived: (info) => {
          console.log('state', info.state);
        }
      });
    }).then(() => {
      if (this.oauthService.getIdentityClaims()) {
        this.isLogged = this.authService.getIsLogged();
        this.isAdmin = this.authService.getIsAdmin();
        this.userName = this.authService.getUsername();
        this.roles = this.authService.getRoles();
        this.messageService.sendMessage(this.userName);
      }
    });
  }



}
