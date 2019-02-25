import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private httpClientService: HttpClient,
  ) {
    this.titleService.setTitle('Posts');
  }

  ngOnInit() {
    const obj$ = this.httpClientService.get('https://jsonplaceholder.typicode.com/posts'); //const เป็นการ assign ค่าแล้วไม่สามารถเปลี่ยนได้
    obj$.subscribe({
      next: (response: any[]) => {
        this.posts = response.slice(0, 5).map((res) => { //ตั้งปต่ตัวที่ 0 มา 5 ตัว 
          return new Post(res.id, res.title, res.body); //return ค่าใหม่กลับไป
        });
        // console.log(this.posts);
      }
      // next หมายถึงมันทำงาน success จะมีอีกสองตัวคือ error:()=>{}, complete:()=>{}
    })
    this.form = this.fb.group({
      id: [''],
      title: [''],
      body: ['']
    })
  }

  onSubmit(form: FormGroup) {
    // httpClientService.post = subject
    // obj$ = Obserable ผู้ส่ง
    // subscribe = ผู้รับ คนที่เอาไปใช้
    const value = form.value;

    if (value.id) { // update
      const obj$ = this.httpClientService.put('https://jsonplaceholder.typicode.com/posts/' + value.id, value)
      obj$.subscribe({
        next: (response: any) => {
          const post = new Post(response.id, response.title, response.body);
          const index = this.posts.findIndex((p)=> p.id === post.id); // === ค่าที่เท่ากัน
          console.log(index);
          this.posts[index] = post;
        }
      })
    }
    else { // create
      const obj$ = this.httpClientService.post('https://jsonplaceholder.typicode.com/posts', value)
      obj$.subscribe({
        next: (response: any) => {
          console.log(response);
          const post = new Post(response.id, response.title, response.body);
          // this.posts = [post, ...this.posts];
          this.posts.unshift(post); //unshift ทำงานตรงข้ามกับ post
          this.form.reset();
        }
      })
    }
  }

  onClick(post: Post) {
    this.form.patchValue({ //patchValue ให้เป็นค่าอะไรสักอย่างนึง
      id: post.id,
      title: post.title,
      body: post.body
    })
  }

  onDelete(post: Post){
    const con = confirm('Are You sure?');
    if(con){
      const obj$ = this.httpClientService.delete('https://jsonplaceholder.typicode.com/posts/' + post.id);
      obj$.subscribe({
        next: ()=>{
          // const index = this.posts.findIndex((p)=> p.id === post.id);
          // delete this.posts[index];
          // this.posts.splice(index, 1);
          this.posts = this.posts.filter(p => p.id !== post.id);
        }
      })
    }
  }

}
