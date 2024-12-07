import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleAddComponent } from './bicycle-add.component';

describe('BicycleAddComponent', () => {
  let component: BicycleAddComponent;
  let fixture: ComponentFixture<BicycleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BicycleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicycleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
