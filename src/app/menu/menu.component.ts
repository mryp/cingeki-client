import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //フィールド
  //------------------------------------------------
  /**
   * タイトル
   */
  title:string = 'シンデレラガールズ劇場';

  /**
   * 話数保持変数
   */
  storyNumber:number = 1;

  //メソッド
  //------------------------------------------------
  /**
   * コンストラクタ
   */
  constructor(
    private router: Router
  ) { }

  /**
   * 初期実行メソッド
   */
  ngOnInit() {
  }

  /**
   * 話数を指定して表示
   */
  showStroyNumber() {
    console.log("showStroyNumber num=" + this.storyNumber);
    this.router.navigate(["/story", this.storyNumber]);
  }
}
