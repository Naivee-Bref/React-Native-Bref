/**
 * Created by SorosLiu on 16/10/21.
 */

import React, {Component} from 'react';
import {
  AsyncStorage
} from 'react-native';
import Reflux from 'reflux';
import _ from  'lodash';

import DiaryItem from './../data/DiaryItem';
import DiaryActions from './../actions';

const DIARY_KEY = '@Bref:diaries';

export default diaryStore = Reflux.createStore({
  init() {
    this._diaries = [];
    this._loadDiaries().done();
    this.listenTo(DiaryActions.createDiary, this.createDiary);
    this.listenTo(DiaryActions.deleteDiary, this.deleteDiary);
    this.listenTo(DiaryActions.editDiary, this.editDiary);
    this.listenTo(DiaryActions.deleteAllDiaries, this.deleteAllDiaries);
    this.emit();
  },

  async _loadDiaries() {
    await AsyncStorage.getItem(DIARY_KEY)
      .then(result => {
        if (result !== null) {
          this._diaries = JSON.parse(result).map((diaryObject) => {
            return DiaryItem.CreateFromObject(diaryObject);
          });
          this.emit();
        } else {
          console.info(`$(DIARY_KEY) not found in storage`);
        }
      })
      .catch(error => {
        console.error('Load Storage Error: ', error.message);
      });
  },

  async _writeDiaries() {
    await AsyncStorage.setItem(DIARY_KEY, JSON.stringify(this._diaries))
      .catch(error => {
        console.error('Write Storage Error: ', error.message);
      });
  },

  emit() {
    this._writeDiaries().done();
    this.trigger(this._diaries);
  },

  createDiary(timeStamp, text, location, imageUrl) {
    this._diaries.push(new DiaryItem(timeStamp, text, location, imageUrl));
    console.log(this._diaries);
    this.emit();
  },

  deleteDiary(toDeleteDiary) {
    _.remove(this._diaries, (diary) => {
      return diary.timeStamp === toDeleteDiary.timeStamp;
    });
    this.emit();
  },

  editDiary(toEditDiary) {
    let match = _.find(this._diaries, (diary) => {
      return diary.timeStamp === toEditDiary.timeStamp;
    });
    match.setFromObject(toEditDiary);
    this.emit();
  },

  deleteAllDiaries() {
    this._diaries = [];
    this.emit();
  }
});


