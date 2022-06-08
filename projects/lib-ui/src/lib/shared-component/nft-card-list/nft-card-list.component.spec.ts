import { NftCardListComponent } from './nft-card-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftCardListComponent', () => {
  let component: NftCardListComponent;
  let fixture: ComponentFixture<NftCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftCardListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
