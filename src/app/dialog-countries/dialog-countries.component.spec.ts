import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCountriesComponent } from './dialog-countries.component';

describe('DialogCountriesComponent', () => {
  let component: DialogCountriesComponent;
  let fixture: ComponentFixture<DialogCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
