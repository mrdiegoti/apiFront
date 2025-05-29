import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPeticionesComponent } from './mispeticiones.component';

describe('MispeticionesComponent', () => {
  let component: MisPeticionesComponent;
  let fixture: ComponentFixture<MisPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisPeticionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
