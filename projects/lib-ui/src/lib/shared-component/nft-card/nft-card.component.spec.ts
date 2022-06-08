import { NftCardComponent } from './nft-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftCardComponent', () => {
  let component: NftCardComponent;
  let fixture: ComponentFixture<NftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
