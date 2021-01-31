import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Quill } from 'quill';
import { AuthService } from '../services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../_models/note';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public editor: Quill;
  public now: Date = new Date();
  private user: User;
  public currentNote: Note;
  public listOfNotes: Array<String>;

  constructor(private authService: AuthService, private firestore: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.currentNote = <Note>{};
    var notes: Array<Note>
    this.getNotes().subscribe(res => {
      var self = this;
      notes = <Array<Note>>res;
      this.currentNote = notes[0];
      notes.forEach(function (item, index) {
        self.listOfNotes.indexOf(item.name) === -1 ? self.listOfNotes.push(item.name) : {};
      });
    }, err => {
      console.log(err)
    })
    this.listOfNotes = [];
   }

   getNotes() {
     return this.firestore.collection('users')
     .doc(this.user.uid)
     .collection('notes').valueChanges().pipe(take(1));
   }

   editNote() {
     this.currentNote.lastModifiedAt = new Date(Date.now())
     return this.firestore.collection('users')
     .doc(this.user.uid)
     .collection('notes').doc(this.currentNote!.name).set(this.currentNote);
   }

  ngOnInit(): void {
  }

}
