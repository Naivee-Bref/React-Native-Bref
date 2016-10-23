/**
 * Created by SorosLiu on 16/10/21.
 */

import moment from 'moment';

export default class DiaryItem {
  constructor(timeStamp, text) {
    this.timeStamp = timeStamp;
    this.text = text;
  }

  setFromObject(object) {
    this.timeStamp = object.timeStamp;
    this.text = object.text;
  }

  static CreateFromObject(object) {
    return new DiaryItem(object.timeStamp, object.text);
  }
}