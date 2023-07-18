import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {User} from "../model/User";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it("should return token",()=>{
  //   const user: User = {username: 'testuser', password: 'testpassword' };
  //   service.login(user).subscribe(res =>{
  //     expect(res).toBeTruthy();
  //     expect(typeof res).toBe("string")
  //     });
  //   const req = httpMock.expectOne(`${environment.api}/auth/token`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush("2dzuvhi23iufh")
  // })
  //
  // it('should make a POST request to register endpoint', () => {
  //   const user: User = { username: 'testuser', password: 'testpassword' };
  //
  //   service.register(user).subscribe(response => {
  //     expect(response).toBeTruthy(); // Add your response expectations here
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.api}/auth/register`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(user); // Verify that the request body matches the user object
  //   req.flush({}); // Provide a mock response if needed
  // });
});
