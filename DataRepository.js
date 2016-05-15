'use strict';

import {
  AsyncStorage,
} from 'react-native';

import React, { Component } from 'react';

var API_COVER_URL = "http://news-at.zhihu.com/api/4/start-image/1080*1776";
var KEY_COVER = '@Cover';

function parseDateFromYYYYMMdd(str) {
  if (!str) return new Date();
  return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
}

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

function DataRepository() { // Singleton pattern
  if (typeof DataRepository.instance === 'object') {
    return DataRepository.instance;
  }

  DataRepository.instance = this;
}

DataRepository.prototype._safeStorage = function(key: string) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (error, result) => {
      var retData = JSON.parse(result);
      if (error) {
        console.error(error);
        resolve(null);
      } else {
        resolve(retData);
      }
    });
  });
};

DataRepository.prototype.getCover = function() {
  return this._safeStorage(KEY_COVER);
}

DataRepository.prototype.updateCover = function() {
  fetch(API_COVER_URL)
    .then((response) => response.json())
    .then((responseData) => {
      AsyncStorage.setItem(KEY_COVER, JSON.stringify(responseData));
    })
    .catch((error) => {
      console.error(error);
    })
    .done();
};

module.exports = DataRepository;
