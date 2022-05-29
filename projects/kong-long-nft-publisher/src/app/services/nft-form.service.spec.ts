import { NftFormService } from './nft-form.service';
import { TestBed } from '@angular/core/testing';

describe('NftFormService', () => {
  let service: NftFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
