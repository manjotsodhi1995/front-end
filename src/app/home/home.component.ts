import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comments :Array<object> = [];
  count: number;
  constructor( private authenticationService: AuthenticationService, private service:UserserviceService) { }

  ngOnInit() {
    this.service.getdata().subscribe(res =>{ this.count =  res.length;
      console.log(this.count);});
    
  }

  receiveComment($event) {
    
    this.service.getdata().subscribe(res =>{  
      this.comments  =  res;
      this.count =  this.comments.length;
      
    });
  
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  
   }

  logout(){
    this.authenticationService.logout();
  }

}
