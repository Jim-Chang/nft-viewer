import { NftSeriesComponent } from './nft-series.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftSeriesComponent', () => {
  let component: NftSeriesComponent;
  let fixture: ComponentFixture<NftSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftSeriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
