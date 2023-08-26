import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCreateComponent } from './agency-create.component';

describe('AgencyCreateComponent', () => {
  let component: AgencyCreateComponent;
  let fixture: ComponentFixture<AgencyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
