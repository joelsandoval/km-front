import { Component, OnInit } from '@angular/core';
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
    //silentRefreshRedirectUri: `${window.location.origin}/km-front`,
    //useSilentRefresh: true
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

  /* public getUsername(): string {
        return this.oauthService.getIdentityClaims()[`preferred_username`];
    } */

  ngOnInit(): void {
    this.roles = this.authService.getRoles();

    this.messageService.getMessage().subscribe({
      next: res => {

        this.userName = res['text'];
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  public configure(authConfig: AuthConfig): void {
    console.log('pasa a ver si entra al config')
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument()
    .then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = true;
          this.isAdmin = true;
         //this.userName = this.authService.getUsername();
          this.userName =  this.oauthService.getIdentityClaims()[`preferred_username`];
          this.roles = this.authService.getRoles();
          this.messageService.getMessage().subscribe({
      next: res => {

        this.userName = res['text'];
        console.log(res)
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
          this.messageService.sendMessage(this.userName);
          console.log(this.oauthService.getAccessToken());
          console.log(this.oauthService.getIdentityClaims());
          console.log(this.userName);
         // console.log(this.messageService.sendMessage(this.userName));

        }
      });
  }
}
