import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { StoryinfoService } from "../storyinfo.service"
import { IndexmakerService } from '../indexmaker.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  storyNumber:number;
  storyTitle:string;
  storyImageUrl:string;
  storyNextNumber:number;
  storyPrevNumber:number;

  constructor(
    private storyService:StoryinfoService,
    private route: ActivatedRoute,
    private router: Router,
    private indexMarker:IndexmakerService
  ) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.showStory(this.indexMarker.getIndex());
  }

  backToMenu() {
    this.router.navigate(["/menu"]);
  }

  showStory(number:number) {
    this.storyNumber = number;
    this.indexMarker.setIndex(this.storyNumber);

    this.storyService.sendStory(number,
      (responce, error) => {
        if (responce != null) {
          this.setSuccessStory(responce);
        } else if (error != null) {
          this.setErrorStory(error);
        }
      }
    );
  }

  setSuccessStory(responce:Response) {
    console.log(responce.text());
    let story = responce.json();
    this.storyTitle = story.title;
    this.storyImageUrl = story.url;
    this.storyNextNumber = story.nextid;
    this.storyPrevNumber = story.previd;
  }

  setErrorStory(error:any) {
    let errorText = error.status + ":" + error.statusText;
    if (error.status == 0 || error.statusText == "") {
      errorText = "サーバー接続エラー";
    }
    console.log(errorText);
    this.storyTitle = errorText;
    this.storyImageUrl = "assets/img/noimage.png";
    this.storyNextNumber = 0;
    this.storyPrevNumber = 0;
  }

  nextImage() {
    if (this.storyNextNumber <= 0) {
      return;
    }
    this.showStory(this.storyNextNumber);
    this.resetPosition();
  }

  prevImage() {
    if (this.storyPrevNumber <= 0) {
      return;
    }
    this.showStory(this.storyPrevNumber);
    this.resetPosition();
  }

  resetPosition() {
    setTimeout(()=> {
      window.scroll(0, 0);
    }, 1);
  }
}
