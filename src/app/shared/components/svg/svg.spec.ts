import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg } from './svg';

describe('Svg', () => {
  let component: Svg;
  let fixture: ComponentFixture<Svg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Svg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Svg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
