import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Note } from '../_models/note';
import { NotesService } from '../services/notes/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { NewNoteDialogComponent } from '../_dialogs/new-note-dialog/new-note-dialog/new-note-dialog.component';
import { ConfirmDeleteDialogComponent } from '../_dialogs/confirm-delete-dialog/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav/sidenav.service';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChildren('sidenav') children!: QueryList<MatSidenav>;
  public currentNote: Note | null;
  public listOfNotes: Array<String>;
  isDataAvailable: boolean = false;


  constructor(private notesService: NotesService, public dialog: MatDialog, private sidenavService: SidenavService) {
    this.currentNote = <Note>{};
    this.listOfNotes = [];
    this.notesService.refreshUser()
    // this.refreshPage()
   }

   refreshPage() {
    this.currentNote = null;
    this.isDataAvailable = false
    this.listOfNotes = [];
    var notes: Array<Note>
    this.notesService.getNotes().subscribe(res => {
      console.log(res)
      if (res.length >= 1) {
        var self = this;
        notes = <Array<Note>>res;
        notes.forEach(function (item, index) {
          self.listOfNotes.indexOf(item.name) === -1 ? self.listOfNotes.push(item.name) : {};
          if (item.current) {
            self.currentNote = item;
          }
        });
      }
      else {
        var firstNote: Note = {createdAt: new Date(Date.now()), current: true, lastModifiedAt: new Date(Date.now()), name: "My First Note", note: ""};
        this.currentNote = firstNote
        this.listOfNotes.push("My First Note")
        this.editNote()
      }
      if (!this.currentNote) {
        console.log('now current log found using 0 index')
        this.currentNote = notes[0];
        this.currentNote.current = true;
        this.editNote();
      }
      this.isDataAvailable = true
    }, err => {
      console.log(err)
    });
   }

   editNote() {
    this.currentNote!.lastModifiedAt = new Date(Date.now());
    this.notesService.updateNote(this.currentNote!.name, this.currentNote!);
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
    this.currentNote!.current = false;
    this.editNote();
    var note: Note =  {createdAt: new Date(Date.now()), current: true, lastModifiedAt: new Date(Date.now()), name: <string>name, note: ""};
    this.notesService.updateNote(<string>name, note).then(() => {
      this.refreshPage();
    });
   }

   openDeleteConfirmationDialog(name: String): void {
     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote(<string>name)
      }
      else {
        console.log('The dialog was closed');
      }
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
        // this.createNewNote(result)
      }
      else {
        console.log('The dialog was closed');
      }
    });
   }

   changeCurrentNote(noteId: String) {
     this.currentNote!.current = false;
     this.editNote();
    this.notesService.getNote(<string>noteId).subscribe(res => {
      this.currentNote = <Note>res
      this.currentNote.current = true
      this.editNote();
    })
   }

  ngOnInit(): void {
    console.log('ngoninit')
    this.refreshPage()
    // console.log(this.sidenav)
    // this.sidenavService.setSidenav(this.sidenav);
  }

  ngAfterViewInit() {
    this.children.changes.subscribe(r => {
      console.log(r.first)
      this.sidenavService.setSidenav(r.first);
    })
  }

}
