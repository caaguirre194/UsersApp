import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable, from } from "rxjs";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { ConditionalExpr } from "@angular/compiler";
import { map } from "rxjs/operators";
import { promise } from "protractor";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private AFauth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.AFauth.authState.pipe(
      map(auth => {
        if (isNullOrUndefined(auth)) {
          this.router.navigate(["/init"]);
          return false;
        } else {
          return true;
        }
        // console.log(auth);
      })
    );
  }
}
