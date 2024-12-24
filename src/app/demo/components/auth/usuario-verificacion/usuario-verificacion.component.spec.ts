import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVerificacionComponent } from './usuario-verificacion.component';

describe('UsuarioVerificacionComponent', () => {
  let component: UsuarioVerificacionComponent;
  let fixture: ComponentFixture<UsuarioVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioVerificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
