import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpisGridComponent } from './kpis-grid.component';

describe('KpisGridComponent', () => {
  let component: KpisGridComponent;
  let fixture: ComponentFixture<KpisGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpisGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpisGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
