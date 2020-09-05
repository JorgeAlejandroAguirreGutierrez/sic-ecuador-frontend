import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEditableComponent } from './tabla-editable.component';

describe('TablaEditableComponent', () => {
  let component: TablaEditableComponent;
  let fixture: ComponentFixture<TablaEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
