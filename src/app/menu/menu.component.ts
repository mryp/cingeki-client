import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexmakerService } from '../indexmaker.service';

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
    private router: Router,
    private indexMarker:IndexmakerService
  ) { }

  /**
   * 初期実行メソッド
   */
  ngOnInit() {
    this.indexMarker.load();
    this.storyNumber = this.indexMarker.getIndex();
  }

  /**
   * 話数を指定して表示
   */
  showStroyNumber() {
    this.indexMarker.setIndex(this.storyNumber);
    this.router.navigate(["/story"]);
  }
}
