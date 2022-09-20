import { TestBed } from '@angular/core/testing';

import { CatalogDetailsService } from './catalog-details.service';

describe('CatalogDetailsService', () => {
  let service: CatalogDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
