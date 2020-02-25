import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts'; 

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPost(post){
    return this.http.post(this.url, JSON.stringify(post))
    .pipe(
      catchError((error:Response) => {
        if(error.status === 400){
          return Observable.throw(new BadRequestError(error.json));
        }
        return Observable.throw(new AppError(error));
      })
    );
  }

  updatePost(post){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  deletePost(id){
    return this.http.delete(this.url + '/' + id)
    .pipe(
      catchError((error: Response) => {
        if(error.status === 404){
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(error));
      })
    );
  }

}
