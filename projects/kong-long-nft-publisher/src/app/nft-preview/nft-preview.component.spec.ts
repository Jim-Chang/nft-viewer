import { NftPreviewComponent } from './nft-preview.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftPreviewComponent', () => {
  let component: NftPreviewComponent;
  let fixture: ComponentFixture<NftPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
