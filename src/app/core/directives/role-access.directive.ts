import {computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';
import {RoleService} from '../services/role.service';
import {TRole} from '../models/role.type';

@Directive({
  selector: '[appRoleAccess]',
})
export class RoleAccessDirective {
  #templateRef    = inject<TemplateRef<any>>(TemplateRef);
  #viewContainer  = inject(ViewContainerRef);
  #roleService    = inject(RoleService);

  appRoleAccess = input.required<TRole[]>();
  isViewCreated = false;

  shouldShow = computed(() => {
    const allowedRoles = this.appRoleAccess();
    return this.#roleService.hasRole(...allowedRoles);
  });

  constructor() {
    effect(() => {
      if (this.shouldShow() && !this.isViewCreated) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
        this.isViewCreated = true;
      } else if (!this.shouldShow() && this.isViewCreated) {
        this.#viewContainer.clear();
        this.isViewCreated = false;
      }
    });
  }
}
