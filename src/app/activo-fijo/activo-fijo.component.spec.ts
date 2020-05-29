import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoFijoComponent } from './activo-fijo.component';

describe('ActivoFijoComponent', () => {
  let component: ActivoFijoComponent;
  let fixture: ComponentFixture<ActivoFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivoFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
