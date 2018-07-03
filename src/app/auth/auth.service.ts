import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => this.router.navigate(['/'])
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.token = token;
            }
          );
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    )
    return this.token;
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/']);
    this.token = null;
  }
}
