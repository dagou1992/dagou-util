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
export function timestampToTime(timestamp: number, onlyDate: boolean = false,
                                space: string = ' ', hasSecond: boolean = true, isMillionSecond: boolean = false): string {
    let date: Date = new Date(isMillionSecond ? timestamp : timestamp * 1000);
    let y: string = date.getFullYear();
    let m: number | string = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d: number | string = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h: number | string = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute: number | string = date.getMinutes();
    let second: number | string = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return !onlyDate ? y + '-' + m + '-' + d + space + h + ':' + minute + (hasSecond ? ':' + second : '') : y + '/' + m + '/' + d;
}

/**
 * 日期格式转时间戳
 *
 * @param {string} time 日期
 * @return {number} 时间戳
 */
export function timeToTimestamp(time: string): number {
    return (new Date(time).getTime()) / 1000;
}
/**
 * 获取当天零点时间戳
 * @return {number} 时间戳
 */
export function getTodayStartTime(): number {
    return new Date(new Date().toLocaleDateString()).getTime() / 1000;
}

/**
 * 获取当天23:59:59时间戳
 * @return {number} 时间戳
 */
export function getTodayEndTime(): number {
    return (new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000) / 1000 - 1;
}