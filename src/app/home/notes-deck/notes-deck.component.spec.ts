import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDeckComponent } from './notes-deck.component';

describe('NotesDeckComponent', () => {
  let component: NotesDeckComponent;
  let fixture: ComponentFixture<NotesDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
