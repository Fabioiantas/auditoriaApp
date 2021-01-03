import { TestBed } from '@angular/core/testing';

import { ItemRequisitosService } from './item-requisitos.service';

describe('ItemRequisitosService', () => {
  let service: ItemRequisitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRequisitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
