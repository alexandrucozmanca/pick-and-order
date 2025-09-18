import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAndOrder } from './pick-and-order';

describe('PickAndOrder', () => {
  let component: PickAndOrder;
  let fixture: ComponentFixture<PickAndOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickAndOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickAndOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
