import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetWrapperComponent } from './widget-wrapper.component';

describe('WidgetWrapperComponent', () => {
  let component: WidgetWrapperComponent;
  let fixture: ComponentFixture<WidgetWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
