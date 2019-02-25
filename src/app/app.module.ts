import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { Route, RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { HttpClientModule } from '@angular/common/http';

const route: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent
  },{
    path: 'posts',
    component: PostComponent
  },{
    path: 'posts/:id', //:id เป็นชื่อตัวแปรที่เอาไว้ระบุว่าเราจะส่งค่าอะไรสักอย่างหนึ่งไปกับ path
    component: PostDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderProfileComponent,
    PostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(route) //ให้ angular มี router ได้
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
