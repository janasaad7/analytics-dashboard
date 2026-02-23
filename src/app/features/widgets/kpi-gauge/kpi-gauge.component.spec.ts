import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiGaugeComponent } from './kpi-gauge.component';

describe('KpiGaugeComponent', () => {
  let component: KpiGaugeComponent;
  let fixture: ComponentFixture<KpiGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
