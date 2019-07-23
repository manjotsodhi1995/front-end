import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { CommentsComponent, ReplytoreplyDirective } from './comments/comments.component';
import { ChildboxComponent } from './childbox/childbox.component';
import { DatacontainerDirective } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/gaurds/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserserviceService } from './userservice.service';
import { AuthenticationService } from './authentication.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent ,
  canActivate: [AuthGuard] 
}
    
];

@NgModule({
  declarations: [
    AppComponent,
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent,
    DatacontainerDirective,
    ReplytoreplyDirective,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers: [UserserviceService,AuthenticationService],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ChildboxComponent],
  bootstrap: [AppComponent],
  exports : [ RouterModule]
})
export class AppModule { }
