import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideEditComponent } from './ride-edit.component';

describe('RideEditComponent', () => {
  let component: RideEditComponent;
  let fixture: ComponentFixture<RideEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
