import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appDisableForRoles]'
})


export class DisableForRolesDirective implements OnChanges {

  @Input('appDisableForRoles') allowedRoles!: any[];
  sub!: Subscription;

  constructor(private readonly authService: AuthService,
    private readonly elementRef: ElementRef) {

   }

  ngOnChanges(changes: SimpleChanges): void {
    this.allowedRoles?.push('admin');
    this.sub = this.authService.getRoles()
    .pipe(
      map((user: string) => Boolean(this.allowedRoles.includes(user)))
    )
    .subscribe((hasRole) => {
      !hasRole ? this.elementRef.nativeElement.classList.add('role_disable') : this.elementRef.nativeElement.classList.remove('role_disable');
    });
  }
}
