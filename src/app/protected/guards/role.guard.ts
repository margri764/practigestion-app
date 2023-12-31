import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RestrictStaffComponent } from 'src/app/shared/messages/restrict-staff/restrict-staff/restrict-staff.component';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {


  openDialogRestrict() {
   this.dialog.open(RestrictStaffComponent, {
      disableClose: true,
      panelClass: "custom-modalbox-message",
    });
  }
  constructor( 
              private authService : AuthService,
              private dialog : MatDialog,
              private store : Store<AppState>,
              ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('user').pipe(
      filter( ({user})=>  user != null && user != undefined),
      map(({ user }) => {
        if (user.role !== 'CLIENT_ROLE') {
          this.openDialogRestrict();
          return false;
        } else {
          return true;
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.store.select('user').pipe(
        filter( ({user})=>  user != null && user != undefined),
        map(({ user }) => {
          if (user.role !== 'CLIENT_ROLE') {
            this.openDialogRestrict();
            return false;
          } else {
            return true;
          }
        })
      );
    }

}
