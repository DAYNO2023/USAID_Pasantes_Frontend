import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariorestablecerComponent } from './usuario-restablecer.component';

describe('UsuariorestablecerComponent', () => {
  let component: UsuariorestablecerComponent;
  let fixture: ComponentFixture<UsuariorestablecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariorestablecerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariorestablecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
