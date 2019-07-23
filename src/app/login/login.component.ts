import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OAuth } from "oauthio-web";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    provider: string;
    name : string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
        ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        OAuth.initialize("_HbKiBzf1I38_m-kDZi3nY85N48");
        this.provider='github';
        this.authenticationService.logout();
    }

    
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.name = data.username.replace('"','');
                    let id = JSON.stringify(data._id).replace('"','');
                    localStorage.setItem('currentUsername', (this.name));
                    localStorage.setItem('currentUserid',(id.slice(0 , id.length - 1)));
                    this.router.navigate(['/home']);
                },
                error => {
                    
                    this.loading = false;
                });
    }

    Auth(){
        
        OAuth.popup(this.provider)
      .done(res => {
            
            this.authenticationService.loginwithgithub(res.access_token).pipe(first()).subscribe(data  =>{
                if(data)
                {
                    this.name = data.login;
                    localStorage.setItem('currentUsername', (this.name));
                    localStorage.setItem('currentUserid', JSON.stringify(data.id));
                 this.router.navigate(['/home']);
                }
            })
           
      }
      )
      .fail(err => {
       alert("user authentication failed");
      });
 
    }
  }
