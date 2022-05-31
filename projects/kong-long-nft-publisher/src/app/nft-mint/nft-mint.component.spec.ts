import { NftMintComponent } from './nft-mint.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftMintComponent', () => {
  let component: NftMintComponent;
  let fixture: ComponentFixture<NftMintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftMintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
