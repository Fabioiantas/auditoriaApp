import { TestBed } from '@angular/core/testing';

import { AuditoriaEntidadeService } from './auditoria-entidade.service';

describe('AuditoriaEntidadeService', () => {
  let service: AuditoriaEntidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditoriaEntidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
