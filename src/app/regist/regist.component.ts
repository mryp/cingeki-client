import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoryinfoService } from "../storyinfo.service"

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
  //フィールド
  //------------------------------------------------
  title:string = "登録処理";
  sendUrl:string = "";
  sendNumber:number = 1;
  sendTitle:string = "";
  responceRegist:string = "";

  sendMatomeUrl:string = "";
  sendMatomeOverwrite:boolean = false
  responceRegistMatome:string = "";

  //メソッド
  //------------------------------------------------
  /**
   * コンストラクタ
   */
  constructor(
    private storyService:StoryinfoService,
    private router: Router
  ) { }

  /**
   * 初回実行メソッド
   */
  ngOnInit() {
  }

  backToMenu() {
    this.router.navigate(["/menu"]);
  }

  /**
   * 1件のデータを送信する
   */
  sendRegist() {
    this.storyService.sendRegist(this.sendNumber, this.sendTitle, this.sendUrl,
     (responce, error) => {
        if (responce != null) {
          this.responceRegist = responce.text();
        } else if (error != null) {
          this.responceRegist = error.status + ":" + error.statusText;
        }
      }
    );
  }

  /**
   * まとめサイトからデータを登録する
   */
  sendRegistMatome() {
    this.storyService.sendRegistMatome(this.sendMatomeUrl, this.sendMatomeOverwrite,
      (responce, error) => {
        if (responce != null) {
          this.responceRegistMatome = responce.text();
        } else if (error != null) {
          this.responceRegistMatome = error.status + ":" + error.statusText;
        }
      }
    );
  }
}
