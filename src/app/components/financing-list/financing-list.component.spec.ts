import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingListComponent } from './financing-list.component';

describe('FinancingListComponent', () => {
  let component: FinancingListComponent;
  let fixture: ComponentFixture<FinancingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
