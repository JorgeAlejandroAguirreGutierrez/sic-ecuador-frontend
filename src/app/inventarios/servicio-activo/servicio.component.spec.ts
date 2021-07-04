import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicioComponent } from './servicio.component';

describe('ServicioComponent', () => {
  let component: ServicioComponent;
  let fixture: ComponentFixture<ServicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
