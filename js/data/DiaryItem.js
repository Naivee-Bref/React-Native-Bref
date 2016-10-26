/**
 * Created by SorosLiu on 16/10/21.
 */

import moment from 'moment';

export default class DiaryItem {
  constructor(timeStamp, text, location, imageUrl) {
    this.timeStamp = timeStamp;
    this.text = text;
    this.location = location;
    this.imageUrl = imageUrl;
  }

  setFromObject(object) {
    this.timeStamp = object.timeStamp;
    this.text = object.text;
    this.location = object.location;
    this.imageUrl = object.imageUrl;
  }

  static CreateFromObject(object) {
    return new DiaryItem(object.timeStamp, object.text, object.location, object.imageUrl);
  }
}