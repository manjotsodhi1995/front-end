import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserserviceService {

       url = "http://localhost:4000"
      constructor(private http: HttpClient) { }
  
      getAll() {
        return this.http.get<User[]>(this.url + "/users");
    }

    getById(id: number) {
        return this.http.get(this.url + `/users/` + id);
    }

    register(user: User) {
        return this.http.post(this.url + "/users/register", user);
    }

    update(user: User) {
        return this.http.put( this.url + `/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete( this.url + `/users/` + id);
    }

    sendcommentdata(data){
        
        var reqHeader = new HttpHeaders({ 
            'Content-Type': 'application/json'
         });
        console.log(data);
        const res = data;
       return this.http.post(this.url + "/comment/postcomments",res,{headers:reqHeader});
    }

    getdata():Observable<any>{
       return  this.http.get(this.url + "/comment/getcomments");
    }
  }

