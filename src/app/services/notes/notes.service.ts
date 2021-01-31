import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Note } from 'src/app/_models/note';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private user: User;

  constructor(private firestore: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('user')!);
   }

  getNotes() {
    return this.firestore.collection('users')
    .doc(this.user.uid)
    .collection('notes').valueChanges().pipe(take(1));
  }

  getNote(noteId: string) {
   return this.firestore.collection('users')
   .doc(this.user.uid)
   .collection('notes').doc(noteId).valueChanges().pipe(take(1))
  }

  updateNote(noteId: string, note: Note) {
   return this.firestore.collection('users')
   .doc(this.user.uid)
   .collection('notes').doc(noteId).set(note);
  }

  deleteNote(noteId: string) {
    return this.firestore.collection('users')
    .doc(this.user.uid)
    .collection('notes')
    .doc(noteId)
    .delete();
  }
}
