import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolcrearComponent } from './rolcrear.component';

describe('RolcrearComponent', () => {
  let component: RolcrearComponent;
  let fixture: ComponentFixture<RolcrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolcrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolcrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
