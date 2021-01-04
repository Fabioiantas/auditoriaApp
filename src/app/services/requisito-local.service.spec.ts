import { TestBed } from '@angular/core/testing';

import { RequisitoLocalService } from './requisito-local.service';

describe('RequisitoLocalService', () => {
  let service: RequisitoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
