import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosActividadesAddComponent } from './servicios-actividades-add.component';

describe('ServiciosActividadesAddComponent', () => {
  let component: ServiciosActividadesAddComponent;
  let fixture: ComponentFixture<ServiciosActividadesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosActividadesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosActividadesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
