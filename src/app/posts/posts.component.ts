import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[];
  

  constructor(private service: PostService) { 
    
  }

  ngOnInit(){
        this.service.getPosts()
        .subscribe(response =>{
          this.posts = response as any[];
        });
  }

  createPost(input:HTMLInputElement){
    let post = { title: input.value };
    input.value = '';
        this.service.createPost(post)
        .subscribe(
          response =>{
          post['id'] = response['id'];
          this.posts.splice(0,0,post);
          console.log(response);
        }, 
        (error : AppError) => {
          if(error  instanceof BadRequestError){
            alert('BadRequestError ');
          }
          else{
            throw error;
          }
        });
  }

  updatePost(post){
      this.service.updatePost(post)
      .subscribe(
        response => {
        console.log(response);
      });
  }

  deletePost(post){
    this.service.deletePost(post.id)
    .subscribe(
      response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    }, 
    (error: AppError) => {
      if(error instanceof NotFoundError)
      {
        alert('This post has already been deleted');
      }
      else{
        throw error;
      }
    });
  }
 

}
