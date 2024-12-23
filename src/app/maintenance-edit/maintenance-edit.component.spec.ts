import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEditComponent } from './maintenance-edit.component';

describe('MaintenanceEditComponent', () => {
  let component: MaintenanceEditComponent;
  let fixture: ComponentFixture<MaintenanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
