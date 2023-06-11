import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesPageComponent } from './dates-page.component';

describe('DatesPageComponent', () => {
  let component: DatesPageComponent;
  let fixture: ComponentFixture<DatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
