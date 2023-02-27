
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: any;
    public username!: string;
    public isLogged!: boolean;
    public isAdmin!: boolean;

    constructor(
        private oauthService: OAuthService,
    ) { }


    public login(): void {
        this.oauthService.initLoginFlow();
    }

    public logout(): void {
        console.log('entro al servicio de logau')
        this.oauthService.logOut();
    }

    public getIsLogged(): boolean {
        return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
    }

    public getUsername(): string {
        return this.oauthService.getIdentityClaims()[`preferred_username`];
    }

    public getIsAdmin(): boolean {
        let roles: string[] = this.getRoles();
        return roles.indexOf('app-admin') !== -1;
    }

    public getRoles(): string[] {
        const token = this.oauthService.getAccessToken();
        const payload = token.split('.')[1];
        const payloadDecodedJson = atob(payload);
        const payloadDecoded = JSON.parse(payloadDecodedJson);
        return payloadDecoded.realm_access.roles;
    }

}
