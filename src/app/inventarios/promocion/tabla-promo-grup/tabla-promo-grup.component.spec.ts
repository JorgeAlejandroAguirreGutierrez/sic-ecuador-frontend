import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPromoGrupComponent } from './tabla-promo-grup.component';

describe('TablaPromoGrupComponent', () => {
  let component: TablaPromoGrupComponent;
  let fixture: ComponentFixture<TablaPromoGrupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPromoGrupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPromoGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
