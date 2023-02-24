import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../seguridad/login.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard implements CanActivate {

  constructor(
    private loginService: LoginService, 
    private router: Router
    ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles = next.data['requiredRoles'];
    
    if (!this.loginService.getIsLogged()) {
      this.router.navigate(['login']);
      return false;
    }

    const realRol = this.loginService.getIsAdmin() ? 'admin' : 'user';
    
    if (requiredRoles.indexOf(realRol) === -1) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }

}
