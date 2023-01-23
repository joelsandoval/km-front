import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosActividadesComponent } from './servicios-actividades.component';

describe('ServiciosActividadesComponent', () => {
  let component: ServiciosActividadesComponent;
  let fixture: ComponentFixture<ServiciosActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosActividadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
