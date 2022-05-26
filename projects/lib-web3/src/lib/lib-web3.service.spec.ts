import { LibWeb3Service } from './lib-web3.service';
import { TestBed } from '@angular/core/testing';

describe('LibWeb3Service', () => {
  let service: LibWeb3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibWeb3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
