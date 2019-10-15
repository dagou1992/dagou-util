"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 时间戳转日期格式
 *
 * @param {number} timestamp 时间戳
 * @param {boolean} onlyDate 只显示年月日
 * @param {string} space 年月日与时分秒之间的间隔，可选' '或者'T'
 * @param {boolean} hasSecond 显示秒
 * @param {boolean} isMillionSecond 是否更改为毫秒级
 * @return {string} 日期格式
 *
 */
function timestampToTime(timestamp, onlyDate, space, hasSecond, isMillionSecond) {
    if (onlyDate === void 0) { onlyDate = false; }
    if (space === void 0) { space = ' '; }
    if (hasSecond === void 0) { hasSecond = true; }
    if (isMillionSecond === void 0) { isMillionSecond = false; }
    var date = new Date(isMillionSecond ? timestamp : timestamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return !onlyDate ? y + '-' + m + '-' + d + space + h + ':' + minute + (hasSecond ? ':' + second : '') : y + '/' + m + '/' + d;
}
exports.timestampToTime = timestampToTime;
/**
 * 日期格式转时间戳
 *
 * @param {string} time 日期
 * @return {number} 时间戳
 */
function timeToTimestamp(time) {
    return (new Date(time).getTime()) / 1000;
}
exports.timeToTimestamp = timeToTimestamp;
/**
 * 获取当天零点时间戳
 * @return {number} 时间戳
 */
function getTodayStartTime() {
    return new Date(new Date().toLocaleDateString()).getTime() / 1000;
}
exports.getTodayStartTime = getTodayStartTime;
/**
 * 获取当天23:59:59时间戳
 * @return {number} 时间戳
 */
function getTodayEndTime() {
    return (new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000) / 1000 - 1;
}
exports.getTodayEndTime = getTodayEndTime;
