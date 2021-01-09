import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { QuillModule } from 'ngx-quill'


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    CKEditorModule,
    MatIconModule,
    MatListModule,
    // Only for lazy loading, needs changing on deployment
    QuillModule.forRoot()
  ]
})
export class HomeModule { }
