import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from "@angular/http";
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

  responceRegistMatomeAll:string="";

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
          this.responceRegist = this.getSuccessMessage(responce);
        } else if (error != null) {
          this.responceRegist = this.getErrorMessage(error);
        }
      }
    );
  }

  /**
   * 処理成功時のメッセージを取得する
   */
  getSuccessMessage(responce:Response):string {
    return responce.text();
  }

  /**
   * 処理失敗時のメッセージを取得する
   */
  getErrorMessage(error:any):string {
    let errorText = error.status + ":" + error.statusText;
    if (error.status == 0 || error.statusText == "") {
      errorText = "サーバー接続エラー";
    }
    return errorText;
  }

  /**
   * まとめサイトからデータを登録する
   */
  sendRegistMatome() {
    this.storyService.sendRegistMatome(this.sendMatomeUrl, this.sendMatomeOverwrite,
      (responce, error) => {
        if (responce != null) {
          this.responceRegistMatome = this.getSuccessMessage(responce);
        } else if (error != null) {
          this.responceRegistMatome = this.getErrorMessage(error);
        }
      }
    );
  }

  sendRegistMatomeAll() {
    //ここにURLをまとめて書くとループして取得する
    let urlList:string[] = [
    ];

    this.sendRegistMatomeAllItem(urlList, 0);
  }

  sendRegistMatomeAllItem(urlList:string[], index:number) {
    if (index >= urlList.length) {
      return; //終了
    }

    let url = urlList[index];
    this.storyService.sendRegistMatome(url, false, (responce, error) => {
      if (responce != null) {
        console.log("OK: " + url);
        this.responceRegistMatomeAll = this.getSuccessMessage(responce);
        this.sendRegistMatomeAllItem(urlList, index+1);
      } else if (error != null) {
        console.log("NG: " + url);
        this.responceRegistMatomeAll = this.getErrorMessage(error);
      }
    });
  }
}
