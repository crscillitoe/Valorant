import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinRateBarComponent } from './win-rate-bar.component';

describe('WinRateBarComponent', () => {
  let component: WinRateBarComponent;
  let fixture: ComponentFixture<WinRateBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinRateBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinRateBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
