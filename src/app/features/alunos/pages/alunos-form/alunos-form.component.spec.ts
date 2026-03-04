import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosFormComponent } from './alunos-form.component';

describe('AlunosForm', () => {
  let component: AlunosFormComponent;
  let fixture: ComponentFixture<AlunosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlunosFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
