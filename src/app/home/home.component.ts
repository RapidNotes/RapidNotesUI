import { Component, OnInit } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Editor = BalloonEditor;
  public editorConfig = {}
  public listOfNotes = [
    'Shopping List',
    'Work Porjects',
    'Tuesday Meeting',
    'Party Shopping List'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
