import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmadasComponent } from './firmadas.component';

describe('FirmadasComponent', () => {
  let component: FirmadasComponent;
  let fixture: ComponentFixture<FirmadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
