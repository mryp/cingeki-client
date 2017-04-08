import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { StoryComponent } from './story/story.component';
import { RegistComponent } from './regist/regist.component';

import { StoryinfoService } from './storyinfo.service';
import { IndexmakerService } from './indexmaker.service';

//ルーター
const appRoutes = [
  { path: "", component:MenuComponent },
  { path: "regist", component:RegistComponent },
  { path: "story", component:StoryComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StoryComponent,
    RegistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    StoryinfoService,
    IndexmakerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
