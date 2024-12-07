import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationAddComponent } from './station-add.component';

describe('StationAddComponent', () => {
  let component: StationAddComponent;
  let fixture: ComponentFixture<StationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
