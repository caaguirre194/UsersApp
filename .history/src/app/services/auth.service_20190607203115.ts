import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { stringify } from "@angular/compiler/src/util";
import { promise } from "protractor";
import { Router } from "@angular/router";
import { resolve } from 'dns';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private AFauth: AngularFireAuth, private router: Router) {}
  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => rejected(err));
    });
  }
  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve,rejected)) =>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res=>{
resolve(res)
      }).catch(err=>rejected(err))

    })
  }
}
