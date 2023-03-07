import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { Credenciales } from './model/seguridad';
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
  nombre: string = '';
  isAdmin: boolean = false;
  rol: string = '';
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
    //silentRefreshRedirectUri: `${window.location.origin}/km-front`,
    //useSilentRefresh: true
  };

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private messageService: MessageService
    // private messageService2: MessageService
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
    this.oauthService.loadDiscoveryDocument()
    .then(() => this.oauthService.tryLogin())
    .then(() => {
      if (this.oauthService.getIdentityClaims()) {      
        this.isLogged = this.authService.getIsLogged();
        this.roles = this.authService.getRoles();
        this.nombre = this.oauthService.getIdentityClaims()[`name`];
        this.isAdmin = this.roles.includes("app-admin");
        this.userName = this.oauthService.getIdentityClaims()[`preferred_username`];
        this.nombre = this.oauthService.getIdentityClaims()[`name`];
        if (this.roles.includes("app-admin")) {
          this.rol = "app-admin";
        } else {
          this.rol = "app-user";
        }
        let credenciales: Credenciales = new Credenciales(this.userName, this.nombre, this.roles);
        this.messageService.sendMessage(credenciales);
      }
    });
  }


}
