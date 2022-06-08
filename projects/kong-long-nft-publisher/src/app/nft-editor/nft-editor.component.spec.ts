import { NftEditorComponent } from './nft-editor.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftEditorComponent', () => {
  let component: NftEditorComponent;
  let fixture: ComponentFixture<NftEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
