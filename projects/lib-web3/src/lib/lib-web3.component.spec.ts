import { LibWeb3Component } from './lib-web3.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LibWeb3Component', () => {
  let component: LibWeb3Component;
  let fixture: ComponentFixture<LibWeb3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibWeb3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibWeb3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
