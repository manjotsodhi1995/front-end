import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-childbox',
  templateUrl: './childbox.component.html',
  styleUrls: ['./childbox.component.css']
})
export class ChildboxComponent implements OnInit {
  @ViewChild('child') child : ElementRef; 
  childForm: FormGroup;
  replyComment: Array<object> = [];
  submitted: Boolean = false;
  @Output() userReplycomment = new EventEmitter();
  @Output() deletNo = new EventEmitter();
  @Input() commentNo: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.childForm = this.formBuilder.group({
      comment: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.childForm.invalid) {
      return false;
    } else {
      this.replyComment.push({
        commentId : this.commentNo++,
        currentDate : new Date(),
        commentTxt: this.childForm.controls['comment'].value,
        creater: {
          id: localStorage.getItem('currentUserid'),
          display_name:localStorage.getItem('currentUsername')

        },
        respondsto: localStorage.getItem('currentUserid'),
        replyComment: []
      });
     
      this.userReplycomment.emit(this.replyComment);
      this.deletNo.emit(this.commentNo);
    }
  }

  cancel(){
    this.userReplycomment.emit(null);
      this.deletNo.emit(null);
  }
}
