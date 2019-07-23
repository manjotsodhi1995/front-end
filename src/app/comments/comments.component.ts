import { Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { ChildboxComponent } from '../childbox/childbox.component';
import { UserserviceService } from '../userservice.service';
import { element } from '@angular/core/src/render3/instructions';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[replytoreply]',
})
export class ReplytoreplyDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnChanges{
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex ;
  inedit = true;
  com;
  comid;
  valueinedit;
  valueinreply;
  rep;
  repid;
  reparentid;
  public reply: Array<object> = [];

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;
  @ViewChildren (ReplytoreplyDirective) replytoreply:  QueryList<ReplytoreplyDirective>;

  constructor(private resolver: ComponentFactoryResolver , private service :UserserviceService) { }

  ngOnInit() {
    this.service.getdata().subscribe(result =>{
      
      // console.log(result);
      this.postComment = result;
      this.commentIndex = (this.postComment.length);

    });
  }


  ngOnChanges() {
    
    if (this.postComment !== undefined) {
      // console.log('Main array====>', this.postComment);
      
    this.service.getdata().subscribe(res =>{
      this.postComment = res;
    
    });
    }
    
    
  }

  

  replyComment(index) {
    // console.log(index);
    this.loadComponent = true;
    // console.log(this.entry);
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      // console.log(myRef.instance);
      myRef.instance.userReplycomment.subscribe(
        data => {
          // console.log('data is ', data);
          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }

  }

  replytoreplyComment(parentId,i,j){
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    // console.log(this.replytoreply);
    if (this.replytoreply.toArray()[j].viewContainerRef.length >= 0 ) {
      const myRef = this.replytoreply.toArray()[j].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = parentId;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          // console.log('data is ', data);
          this.receiveReplyComment(data, parentId);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }

  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    this.postComment.forEach((element) => {
      if (element['commentId'] === i) {
        element['replyComment'].push(...$event);
        this.service.sendcommentdata(this.postComment).subscribe(res => {
          console.log(res); 
        });
        
       
      }
    });
    this.loadComponent = false;
  }

  EditComment(comment ,i){
    
    this.comid = i;
    this.postComment.forEach((element) => {
      if (element['commentId'] === i){
         this.valueinedit = element['commentTxt'];
      }

    });
  }

  Editreply(rl,j){

    this.repid = j ;
   this.valueinreply = rl.commentTxt;
   this.reparentid = rl.commentId;

  }

  update(){
    
    this.postComment.forEach((element) => {
      if (element['commentId'] === this.comid) {
        element['commentTxt'] = (this.com);
        this.service.sendcommentdata(this.postComment).subscribe(res => {
        //  console.log(res);
         });
      }
    
  });
  
}

updatereply(){

this.postComment.forEach(element => {

  if(element['commentId'] == this.reparentid){
     
    element['replyComment'][this.repid].commentTxt = this.rep;
    this.service.sendcommentdata(this.postComment).subscribe(res =>{
      console.log(res);
    });

  }

});
}

detectuser(comment){

  if(comment.creater.display_name === localStorage.getItem('currentUsername'))
  return false;
  else
  return true;
  
}
}
