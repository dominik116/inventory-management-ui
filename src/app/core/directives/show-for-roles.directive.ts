import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appShowForRoles]'
})
export class ShowForRolesDirective {

  @Input('inventoryForRoles') allowedRoles!: any[];
  sub!: Subscription;

  constructor(private readonly authService: AuthService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    this.allowedRoles?.push('admin');
    this.sub = this.authService.getRoles()
    .pipe(
      map((user: string)=> Boolean(this.allowedRoles.includes(user))),
      distinctUntilChanged(),
      tap((hasRole)=>{
        hasRole ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
