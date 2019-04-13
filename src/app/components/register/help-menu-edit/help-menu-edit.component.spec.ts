import { HelpMenuEditComponent } from './help-menu-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HelpMenuEditComponent', () => {
  let component: HelpMenuEditComponent;
  let fixture: ComponentFixture<HelpMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
