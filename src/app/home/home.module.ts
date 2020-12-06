import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NotesDeckComponent } from './notes-deck/notes-deck.component';


@NgModule({
  declarations: [HomeComponent, NotesDeckComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule
  ]
})
export class HomeModule { }
