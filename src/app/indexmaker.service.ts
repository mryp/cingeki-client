import { Injectable } from '@angular/core';

//クラスで使用する定数
namespace Const{
  export const UNKNOWN_INDEX = 0;
  export const INIT_INDEX = 1;
  export const LS_KEY_INDEX = "IndexmakerService.index";
}

@Injectable()
export class IndexmakerService {
  //フィールド
  //--------------------------------------
  index:number = Const.UNKNOWN_INDEX;

  //メソッド
  //--------------------------------------
  /**
   * コンストラクタ
   */
  constructor() { }

  /**
   * 現在のインデックス位置を取得する
   */
  getIndex(): number {
    return this.index;
  }

  /**
   * インデックス位置を設定する
   * @param i
   */
  setIndex(i:number) {
    this.index = i;
    this.save();
  }

  /**
   * ストレージから読み込む
   */
  load() {
    if (localStorage.getItem(Const.LS_KEY_INDEX)) {
      this.index = Number(localStorage.getItem(Const.LS_KEY_INDEX));
    }
    else {
      this.index = Const.INIT_INDEX;
    }
  }

  /**
   * ストレージに保存する
   */
  save() {
    localStorage.setItem(Const.LS_KEY_INDEX, this.index.toString());
  }
}
