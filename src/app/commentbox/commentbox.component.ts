import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})
export class CommentboxComponent implements OnInit {

  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id ;
  @Output() usercomment = new EventEmitter();
  

  constructor(  private router: Router,private formBuilder: FormBuilder , private service :UserserviceService) { }

  ngOnInit() {
    this.createForm();
    this.service.getdata().subscribe(res =>{
      this.id = res.length;
    
    });
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return false;
    } else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        commentTxt: this.commentForm.controls['comment'].value,
        creater: {
          id: localStorage.getItem('currentUserid'),
          display_name:localStorage.getItem('currentUsername')

        },
        respondsto: null,
        replyComment: []
      });
     
      this.service.sendcommentdata(this.commentInfo).subscribe(res =>{
       
      });
     
      this.usercomment.emit(this.commentInfo);
      this.commentForm.reset();
      
      
    }
  }


}
