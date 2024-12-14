import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRolesGuard implements CanActivate, CanLoad {

  user = new BehaviorSubject<any>(null);

  constructor(private readonly authService: AuthService,
    private readonly router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasRole(route);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'] || [];
    allowedRoles?.push('admin');
    return this.authService.getRoles()
    .pipe(
      map((role: string) => Boolean(allowedRoles.includes(role))),
      tap((hasRole) => {
          if(!hasRole) {
            this.router.navigate(['']);
            localStorage.removeItem('token');
          }
        }
      )
    )
  }
  
}
