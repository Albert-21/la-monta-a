import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentanosTuExperienciaComponent } from './cuentanos-tu-experiencia.component';

describe('CuentanosTuExperienciaComponent', () => {
  let component: CuentanosTuExperienciaComponent;
  let fixture: ComponentFixture<CuentanosTuExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentanosTuExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentanosTuExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
