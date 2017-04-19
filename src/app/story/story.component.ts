import { Component, ViewChild, OnInit, Input, AnimationTransitionEvent, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from "@angular/http";
import { StoryinfoService } from "../storyinfo.service"
import { IndexmakerService } from '../indexmaker.service';
import 'rxjs/add/operator/switchMap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
  animations: [
    trigger('imageFade', [
      state('show' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => show', [style({opacity: 0, }), animate('0.5s ease')]),
      //transition('show => hidden', [style({opacity: 1, }), animate('0.2s ease')]),
    ])
  ]
})
export class StoryComponent implements OnInit {
  storyNumber:number;
  storyTitle:string;
  storyImageUrl:string;
  storyNextNumber:number;
  storyPrevNumber:number;
  nowloading:boolean = true;
  imageVisible:string = "hidden";
  @ViewChild('containerbody') containerBody: HTMLElement;
  isOverCardWidth:boolean = false;

  constructor(
    private storyService:StoryinfoService,
    private route: ActivatedRoute,
    private router: Router,
    private indexMarker:IndexmakerService
  ) {
  }

  ngOnInit() {
    this.onScreenResize();
    this.showStory(this.indexMarker.getIndex());
  }

  @HostListener("window:resize")
  onScreenResize() {
    this.isOverCardWidth = innerWidth >= 480;
  }

  backToMenu() {
    this.router.navigate(["/"]);
  }

  showStory(number:number) {
    this.initLoadImage();
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

  initLoadImage() {
    this.nowloading = true;
    this.imageVisible = "hidden";
    this.storyTitle = "読み込み中...";
    //this.storyImageUrl = "";
  }

  completeLoadImage() {
    this.nowloading = false;
    this.imageVisible = "show";
  }

  imageAnimationDone(event:AnimationTransitionEvent) {
    console.log("imageAnimationDone event:" + event.phaseName + " time:" +  event.totalTime + " state:" + event.fromState + " => " + event.toState);
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
    let cbBody = document.getElementById("container-body");
    setTimeout(()=> {
      cbBody.scrollTop = 0;
    }, 1);
  }
}
