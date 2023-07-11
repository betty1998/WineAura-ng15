import { TestBed } from '@angular/core/testing';

import { AdminErrorInterceptor } from './admin-error.interceptor';

describe('AdminErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminErrorInterceptor = TestBed.inject(AdminErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
