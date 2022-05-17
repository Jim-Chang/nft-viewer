import { NftEntryComponent } from './nft-entry.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftEntryComponent', () => {
  let component: NftEntryComponent;
  let fixture: ComponentFixture<NftEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
