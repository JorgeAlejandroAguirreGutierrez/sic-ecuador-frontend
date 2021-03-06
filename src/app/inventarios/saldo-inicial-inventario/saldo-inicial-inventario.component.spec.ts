import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaldoInicialInventarioComponent } from './saldo-inicial-inventario.component';

describe('SaldoInicialInventarioComponent', () => {
  let component: SaldoInicialInventarioComponent;
  let fixture: ComponentFixture<SaldoInicialInventarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoInicialInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoInicialInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
