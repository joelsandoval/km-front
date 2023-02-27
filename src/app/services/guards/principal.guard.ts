import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../seguridad/auth.service';
import { LoginService } from '../seguridad/login.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = next.data['requiredRoles'];
    console.log(requiredRoles);
    if (!this.authService.getIsLogged()) {
      console.log('no está logueado, según esto');
      this.router.navigate(['']);
      return false;
    }

    const realRol = this.authService.getIsAdmin() ? 'app-admin' : 'app-user';
    
    if (requiredRoles.indexOf(realRol) === -1) {
      console.log('aquí no se que pasa');
      this.router.navigate(['']);
      return false;
    }
    
    return true;
  }

}
