import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStaticComponent } from './total-static.component';

describe('TotalStaticComponent', () => {
  let component: TotalStaticComponent;
  let fixture: ComponentFixture<TotalStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalStaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
