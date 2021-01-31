import { Component, OnInit } from '@angular/core';
import { Note } from '../_models/note';
import { NotesService } from '../services/notes/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { NewNoteDialogComponent } from '../_dialogs/new-note-dialog/new-note-dialog/new-note-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentNote: Note;
  public listOfNotes: Array<String>;

  constructor(private notesService: NotesService, public dialog: MatDialog) {
    this.currentNote = <Note>{};
    this.listOfNotes = [];
    this.refreshPage()
   }

   refreshPage() {
    this.listOfNotes = [];
    var notes: Array<Note>
    this.notesService.getNotes().subscribe(res => {
      var self = this;
      notes = <Array<Note>>res;
      notes.forEach(function (item, index) {
        self.listOfNotes.indexOf(item.name) === -1 ? self.listOfNotes.push(item.name) : {};
        if (item.current) {
          self.currentNote = item;
        }
      });
      if (!this.currentNote) {
        this.currentNote = notes[0];
        this.currentNote.current = true;
        this.editNote();
      }
    }, err => {
      console.log(err)
    });
   }

   editNote() {
    this.currentNote.lastModifiedAt = new Date(Date.now());
    this.notesService.updateNote(this.currentNote!.name, this.currentNote);
   }

   deleteNote(name: String) {
    this.notesService.deleteNote(<string>name).then(() => {
      this.refreshPage()
    })
   }

   editNoteName(originalName: string, newName: string) {
    this.notesService.getNote(originalName).subscribe(res => {
      var note: Note = <Note>res
      this.notesService.deleteNote(originalName).then(() => {
        var newNameNote: Note = note
        newNameNote.name = newName
        this.notesService.updateNote(newName, newNameNote).then(() => {
          this.refreshPage()
        })
      })
    })
   }

   createNewNote(name: String) {
    this.currentNote.current = false;
    this.editNote();
    var note: Note =  {createdAt: new Date(Date.now()), current: true, lastModifiedAt: new Date(Date.now()), name: <string>name, note: ""};
    this.notesService.updateNote(<string>name, note).then(() => {
      this.refreshPage();
    });
   }

   openNewNoteDialog(): void {
    var name: string = ""
    var title: string = "Create New Note"
    var heading: string = "Please provide name for new note."
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '300px',
      data: {name: name, title: title, heading: heading}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewNote(result)
      }
      else {
        console.log('The dialog was closed');
      }
    });
   }

   openEditNoteNameDialog(originalName: String): void {
    var name: string = ""
    var title: string = "Edit Note Name"
    var heading: string = "Please provide new name for note."
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '300px',
      data: {name: name, title: title, heading: heading}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editNoteName(<string>originalName, result)
        console.log(originalName)
        console.log(result)
        // this.createNewNote(result)
      }
      else {
        console.log('The dialog was closed');
      }
    });
   }

   changeCurrentNote(noteId: String) {
     this.currentNote.current = false;
     this.editNote();
    this.notesService.getNote(<string>noteId).subscribe(res => {
      this.currentNote = <Note>res
      this.currentNote.current = true
      this.editNote();
    })
   }

  ngOnInit(): void {}

}
