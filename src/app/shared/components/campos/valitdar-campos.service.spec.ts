import { TestBed } from '@angular/core/testing';

import { ValitdarCamposService } from './valitdar-campos.service';

describe('ValitdarCamposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValitdarCamposService = TestBed.get(ValitdarCamposService);
    expect(service).toBeTruthy();
  });
});
