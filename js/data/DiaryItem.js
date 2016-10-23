/**
 * Created by SorosLiu on 16/10/21.
 */

import moment from 'moment';

export default class DiaryItem {
  constructor(timeStamp, text, location, imageData) {
    this.timeStamp = timeStamp;
    this.text = text;
    this.location = location;
    this.imageData = imageData;
  }

  setFromObject(object) {
    this.timeStamp = object.timeStamp;
    this.text = object.text;
    this.location = object.location;
    this.imageData = object.imageData;
  }

  static CreateFromObject(object) {
    return new DiaryItem(object.timeStamp, object.text, object.location, object.imageData);
  }
}