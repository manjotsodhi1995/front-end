import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router : Router) { }
  url = "http://localhost:4000";
  login(username: string, password: string): Observable<any>{
    return this.http.post(this.url + `/users/authenticate`, { username: username, password: password })
        .pipe(map(user => {
            
           return user;
        }));
}
  
loginwithgithub(token):Observable<any>{

  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
 });
  return this.http.get('https://api.github.com/user',{ headers: reqHeader });
            
   


  

}


  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser'); 
      return this.router.navigate(['']);
  }
}
