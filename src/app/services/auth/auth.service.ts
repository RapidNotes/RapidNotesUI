import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { empty, Observable} from 'rxjs';
import { User } from 'src/app/_models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<any>;
  user: any


  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.authState = firebaseAuth.authState;
    this.user = null;
    // this.user = firebaseAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return firestore.collection('users').doc(user.uid).valueChanges();
    //     }
    //     else {
    //       return empty();
    //     }
    //   })
    // );
   }

   signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)

  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  logout(): Promise<void> {
    return this.firebaseAuth.signOut();
  }

  createOrUpdateUser(userId: string, data: User): Promise<any> {
    return new Promise<any>((_resolve, reject) => {
      this.firestore
      .collection("users").doc(userId)
      .set(data, { merge: true})
      .then(res => {}, (err) => {
        console.log(err)
        reject(err)
      });
    })
  }
}
