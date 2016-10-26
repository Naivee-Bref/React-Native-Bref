/**
 * Created by SorosLiu on 16/10/21.
 */

import moment from 'moment';

export default class DiaryItem {
  constructor(timeStamp, text, city, imageUrl) {
    this.timeStamp = timeStamp;
    this.text = text;
    this.city = city;
    this.imageUrl = imageUrl;
  }

  setFromObject(object) {
    this.timeStamp = object.timeStamp;
    this.text = object.text;
    this.city = object.city;
    this.imageUrl = object.imageUrl;
  }

  static CreateFromObject(object) {
    return new DiaryItem(object.timeStamp, object.text, object.city, object.imageUrl);
  }
}