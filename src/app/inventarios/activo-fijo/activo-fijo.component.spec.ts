import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivoFijoComponent } from './activo-fijo.component';

describe('ActivoFijoComponent', () => {
  let component: ActivoFijoComponent;
  let fixture: ComponentFixture<ActivoFijoComponent>;

  beforeEach(waitForAsync(() => {
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
