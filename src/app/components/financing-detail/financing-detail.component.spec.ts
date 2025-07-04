import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingDetailComponent } from './financing-detail.component';

describe('FinancingDetailComponent', () => {
  let component: FinancingDetailComponent;
  let fixture: ComponentFixture<FinancingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
