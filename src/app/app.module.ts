import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment.local';
import { AppDialogComponent } from './shared/app-dialog/app-dialog.component';
import { NewNoteDialogComponent } from './_dialogs/new-note-dialog/new-note-dialog/new-note-dialog.component';
import { ConfirmDeleteDialogComponent } from './_dialogs/confirm-delete-dialog/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppDialogComponent,
    NewNoteDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    RegisterModule,
    LoginModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
