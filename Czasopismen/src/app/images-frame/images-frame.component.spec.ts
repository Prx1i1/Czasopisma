import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFrameComponent } from './images-frame.component';

describe('ImagesFrameComponent', () => {
  let component: ImagesFrameComponent;
  let fixture: ComponentFixture<ImagesFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
