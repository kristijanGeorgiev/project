import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideAddComponent } from './ride-add.component';

describe('RideAddComponent', () => {
  let component: RideAddComponent;
  let fixture: ComponentFixture<RideAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
