import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPasantesComponent } from './login-pasantes.component';

describe('LoginPasantesComponent', () => {
  let component: LoginPasantesComponent;
  let fixture: ComponentFixture<LoginPasantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPasantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPasantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
