import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinRateBarsComponent } from './win-rate-bars.component';

describe('WinRateBarsComponent', () => {
  let component: WinRateBarsComponent;
  let fixture: ComponentFixture<WinRateBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinRateBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinRateBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
