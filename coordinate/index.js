"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate = /** @class */ (function () {
    function Coordinate(map, data, config) {
        this.map = map;
        this.data = data;
        this.config = config;
    }
    /**
     *  utm坐标转地图经纬度坐标
     *
     *  @param {number} x utm_x
     *  @param {number} y utm_y
     *  @return {Array} 地图经纬度坐标
     */
    Coordinate.prototype.cordRealToMap = function (x, y) {
        var map = this.map;
        var data = this.data;
        var config = this.config;
        x = x * data.pixel_zoom / config.pixel_m;
        y = data.h * data.pixel_zoom - (y * data.pixel_zoom / config.pixel_m);
        var zoom = map.getMaxZoom();
        var p = map.unproject([x, y], zoom);
        return [p.lat, p.lng];
    };
    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {number} lat 纬度
     *  @param {number} lng 经度
     *  @return {Array} utm坐标
     */
    Coordinate.prototype.cordMapToReal = function (lat, lng) {
        var map = this.map;
        var data = this.data;
        var config = this.config;
        var zoom = map.getMaxZoom();
        var _a = map.project([lat, lng], zoom), x = _a.x, y = _a.y;
        x = x / data.pixel_zoom * config.pixel_m;
        y = (data.h * data.pixel_zoom - y) / data.pixel_zoom * config.pixel_m;
        return [x, y];
    };
    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {LatLng} latLng 经纬度坐标
     *  @param {boolean} isReturnArray 是否返回数组
     *  @return {Utm | Array<number>} utm坐标对象或者utm坐标数组
     */
    Coordinate.prototype.latLngToUtm = function (latLng, isReturnArray) {
        if (isReturnArray === void 0) { isReturnArray = false; }
        var lat = latLng.lat, lng = latLng.lng;
        var _a = this.cordMapToReal(lat, lng), x = _a[0], y = _a[1];
        var utm_x = x + this.data.x;
        var utm_y = y + this.data.y;
        return isReturnArray ? [utm_x, utm_y] : { utm_x: utm_x, utm_y: utm_y };
    };
    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {Utm} utm utm坐标
     *  @param {boolean} isReturnArray 是否返回数组
     *  @return {LatLng | Array<number>} 经纬度坐标对象或者经纬度坐标数组
     */
    Coordinate.prototype.utmToLatLng = function (utm, isReturnArray) {
        if (isReturnArray === void 0) { isReturnArray = false; }
        var utm_x = utm.utm_x, utm_y = utm.utm_y;
        var _a = this.data, x = _a.x, y = _a.y;
        var _b = this.cordRealToMap(utm_x - x, utm_y - y), lat = _b[0], lng = _b[1];
        return isReturnArray ? [lat, lng] : { lat: lat, lng: lng };
    };
    return Coordinate;
}());
exports.Coordinate = Coordinate;
