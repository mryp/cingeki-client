import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { StoryinfoService } from "../storyinfo.service"
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
    private router: Router
  ) { }

  ngOnInit() {
    this.storyNumber = this.route.snapshot.params['id'];
    this.showStory(this.storyNumber);
    console.log("ngOnInit");
  }

  backToMenu() {
    this.router.navigate(["/menu"]);
  }

  showStory(number:number) {
    this.storyNumber = number;
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
    this.router.navigate(["/story", this.storyNumber]);
    this.resetPosition();
  }

  prevImage() {
    if (this.storyPrevNumber <= 0) {
      return;
    }
    this.showStory(this.storyPrevNumber);
    this.router.navigate(["/story", this.storyNumber]);
    this.resetPosition();
  }

  resetPosition() {
    setTimeout(()=> {
      window.scroll(0, 0);
    }, 1);
  }
}
