import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContractEditComponent } from './type-contract-edit.component';

describe('TypeContractEditComponent', () => {
  let component: TypeContractEditComponent;
  let fixture: ComponentFixture<TypeContractEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeContractEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
