import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";

//クラスで使用する定数
namespace Const{
  export const BASE_URL = "http://localhost:4100/";
  export const API_REGIST = "api/regist";
  export const API_REGIST_MATOME = "api/regist/matome";
  export const API_STORY = "api/story";
}

@Injectable()
export class StoryinfoService {
  //フィールド
  //--------------------------------------
  responce:string = "";

  //メソッド
  //--------------------------------------
  /**
   * コンストラクタ
   */
  constructor(
    private http:Http
  ) { }

  /**
   * 1件のデータを送信する
   * @param number 話数
   * @param title タイトル
   * @param url 画像URL
   * @param callback 結果コールバック
   */
  sendRegist(number:number, title:string, url:string, callback:(responce: Response, error: any ) => void) {
    let postData = "number=" + number.toString()
        + "&title=" + encodeURIComponent(title)
        + "&url=" + encodeURIComponent(url);
    let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    let options = new RequestOptions({headers: headers});
    let httpPostObservable = this.http.post(
      Const.BASE_URL + Const.API_REGIST, postData, options);
    httpPostObservable.subscribe(
      res => {
        callback(res, null);
      },
      error => {
        console.error(error.status + ":" + error.statusText);
        callback(null, error);
      }
    );
  }

  /**
   * まとめサイトからデータを登録する
   * @param url まとめサイトエントリーURL
   * @param isOverwrite 上書きするかどうか
   * @param callback 結果コールバック
   */
  sendRegistMatome(url:string, isOverwrite:boolean, callback:(responce: Response, error: any ) => void) {
    let postData = "url=" + encodeURIComponent(url)
      + "&overwrite=" + isOverwrite;
    console.log("sendRegistMatome postData=" + postData);
    let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    let options = new RequestOptions({headers: headers});
    let httpPostObservable = this.http.post(
      Const.BASE_URL + Const.API_REGIST_MATOME, postData, options);
    httpPostObservable.subscribe(
      res => {
        callback(res, null);
      },
      error => {
        console.error(error.status + ":" + error.statusText);
        callback(null, error);
      }
    );
  }

  /**
   * 話数情報を取得する
   * @param number 話数
   * @param callback 結果コールバック
   */
  sendStory(number:number, callback:(responce: Response, error: any ) => void) {
    let url:string = Const.BASE_URL + Const.API_STORY + "/" + number.toString();
    var httpGetObservable = this.http.get(url);
    httpGetObservable.subscribe(
      res => {
        callback(res, null);
      },
      error => {
        console.error(error.status + ":" + error.statusText);
        callback(null, error);
      }
    );
  }

}
