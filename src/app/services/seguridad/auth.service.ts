
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { Credenciales } from 'src/app/model/seguridad/seguridad';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: any;
    public username!: string;
    public isLogged!: boolean;
    public isAdmin!: boolean;
    private seguridadURL = environment.ApiConfig.rutaBase + 'seguridad/';

    constructor(
        private oauthService: OAuthService,
        private httpClient: HttpClient
    ) { }


    public login(): void {
        this.oauthService.initLoginFlow();
    }

    public logout(): void {
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

    public getCredenciales(): Credenciales {
        let nombre = this.oauthService.getIdentityClaims()[`name`];
        let user = this.oauthService.getIdentityClaims()[`preferred_username`];
        let roles = this.getRoles();

        return new Credenciales(nombre, user, roles);
    }

    public getToken(): any {
        const token = this.oauthService.getAccessToken();
        const payload = token.split('.')[1];
        const payloadDecodedJson = atob(payload);
        const payloadDecoded = JSON.parse(payloadDecodedJson);
        return payloadDecoded;
    }

    public getUsuario(user: string): Observable<SegUsuarios> {
        return this.httpClient.get<SegUsuarios>(`${this.seguridadURL}usuario/por-usuario/${user}`);
    }


}
