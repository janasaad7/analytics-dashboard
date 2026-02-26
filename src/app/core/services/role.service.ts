import {Injectable, signal} from '@angular/core';
import {TRole} from '../models/role.type';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  currentRole = signal<TRole>('admin');

  setRole(role: TRole) {
    this.currentRole.set(role);
  }

  getRole() {
    return this.currentRole();
  }

  hasRole(...roles: TRole[]): boolean {
    return roles.includes(this.currentRole());
  }
}
