import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosListComponent } from './alunos-list.component';

describe('AlunosList', () => {
  let component: AlunosListComponent;
  let fixture: ComponentFixture<AlunosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlunosListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
