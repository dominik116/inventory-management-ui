import { TestBed } from '@angular/core/testing';

import { HasRolesGuard } from './has-roles.guard';

describe('HasRolesGuard', () => {
  let guard: HasRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
