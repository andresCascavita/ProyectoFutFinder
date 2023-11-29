import { TestBed } from '@angular/core/testing';

import { FirebasePartidosService } from './firebase-partidos.service';

describe('FirebasePartidosService', () => {
  let service: FirebasePartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasePartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
