import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private oauthService: OAuthService
  ) { }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  public logout(): void {
    console.log('entro al servicio de logau')
    this.oauthService.logOut();
  }

  public getIsLogged(): boolean {
    console.log(`¿tiene un token válido? ${this.oauthService.hasValidIdToken()}`);
    console.log(`¿tiene un acces token válido? ${this.oauthService.hasValidAccessToken()}`);
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

/*     public getUsername(): string {
      return this.oauthService.getIdentityClaims()[`preferred_username`];
    } */

  public getIsAdmin(): boolean {
    console.log('entro al isAdmin');
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    console.log(payloadDecoded.realm_access.roles);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }
}
