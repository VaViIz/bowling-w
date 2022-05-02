import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/shared/models/Comment';
import { Image } from 'src/app/shared/models/Image';
import { User } from 'src/app/shared/models/User';
import { CommentService } from 'src/app/shared/services/comment.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;

  //commentObject: Comment = {};
  comments: Array<Comment> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });

  constructor(private fb: FormBuilder, 
    private router: Router,
    private galleryService: GalleryService,
    private commentService: CommentService,
    private userService: UserService ) { }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
        
      });
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      });
    }
    
  }


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());

        // SPREAD OPERATOR
        //this.comments.push({ ...this.commentsForm.value });

        // Object
        // this.comments.push(Object.assign({}, this.commentObject));

        this.commentService.create(this.commentsForm.value).then(_ => {

        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

}
